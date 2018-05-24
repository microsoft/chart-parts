import { BehaviorSubject } from 'rxjs'
import { Mark, Group, SceneGraph } from '@gog/marks'
import { Renderer, ChartOptions } from '@gog/renderer'
import { domChild, domClear, domCreate } from './util/dom'
import SvgMetadata from './SvgMetadata'
import { shallowEqual } from './util/equality'

const { xmlns: ns } = SvgMetadata

// import marks from './marks/index'
// import { domChild, domClear, domCreate, cssClass } from './util/dom'
// import { openTag, closeTag } from './util/tags'
// import { font, textValue } from './util/text'
// import { visit } from './util/visit'
// import clip from './util/svg/clip'
// import metadata from './util/svg/metadata'
// import { styles, styleProperties } from './util/svg/styles'
// import { inherits } from 'vega-util'

export class SvgRenderer extends Renderer<Element, void> {
	private _dirtyID: number = 1
	private _dirty: any[] = []
	private _svg: SVGSVGElement
	private _root: SVGGElement
	private _defs: any = null

	constructor(
		container: HTMLElement,
		sceneGraph: BehaviorSubject<SceneGraph>,
		chartOptions: BehaviorSubject<ChartOptions>,
	) {
		super(container, sceneGraph, chartOptions)

		// Create the root SVG
		this._svg = domChild(container, 0, 'svg', ns) as SVGSVGElement
		this._svg.setAttribute('class', 'marks')
		domClear(container, 1)

		// Create the root SVG Group
		this._root = domChild(this._svg, 0, 'g', ns) as SVGGElement
		domClear(this._svg, 1)

		// create the svg definitions cache
		this._defs = {
			gradient: {},
			clipping: {},
		}
	}

	public renderScene(scene: SceneGraph, options: ChartOptions): Promise<void> {
		return Promise.resolve()
	}

	protected onSceneGraphChanged(
		nextScene: SceneGraph,
		prevScene: SceneGraph,
		options: ChartOptions,
	) {
		// TODO: check for differences in the graph and rerender
		return Promise.resolve()
	}

	protected onChartOptionsChanged(
		options: ChartOptions,
		prevOptions: ChartOptions,
		scene: SceneGraph,
	): Promise<void> {
		const svg = this._svg

		if (options.backgroundColor !== prevOptions.backgroundColor) {
			svg.style.setProperty('background-color', options.backgroundColor)
		}

		if (!shallowEqual(options, prevOptions, { exclude: ['backgroundColor'] })) {
			svg.setAttribute('width', `${options.width * options.scale}`)
			svg.setAttribute('height', `${options.height * options.scale}`)
			svg.setAttribute('viewBox', `0 0 ${options.width} ${options.height}`)
			this._root.setAttribute('transform', 'translate(' + options.origin + ')')
		}

		return Promise.resolve()
	}

	private draw(element: Element, scene: Mark, prev: Mark) {
		const renderer = this
		const svg = this._svg
		const mdef = marks[scene.marktype]
		const events = scene.interactive === false ? 'none' : null
		const isGroup = mdef.tag === 'g'
		const sibling = null
		const i = 0
		const parent

		parent = bind(scene, el, prev, 'g', svg)
		parent.setAttribute('class', cssClass(scene))
		if (!isGroup) {
			parent.style.setProperty('pointer-events', events)
		}
		if (scene.clip) {
			parent.setAttribute('clip-path', clip(renderer, scene, scene.group))
		} else {
			parent.removeAttribute('clip-path')
		}

		function process(item) {
			var dirty = renderer.isDirty(item),
				node = bind(item, parent, sibling, mdef.tag, svg)

			if (dirty) {
				renderer._update(mdef, node, item)
				if (isGroup) recurse(renderer, node, item)
			}

			sibling = node
			++i
		}

		if (mdef.nested) {
			if (scene.items.length) process(scene.items[0])
		} else {
			visit(scene, process)
		}

		domClear(parent, i)
		return parent
	}
}

// Bind a scenegraph item to an SVG DOM element.
// Create new SVG elements as needed.
function bind(
	item: Mark,
	el: Element,
	sibling: Element,
	tag: string,
	svg: SVGSVGElement,
) {
	let node = item.rendered
	const doc = el.ownerDocument

	// create a new dom node if needed
	if (!node) {
		node = domCreate(doc, tag, ns)
		item.rendered = node

		node.__data__ = item
		node.__values__ = { fill: 'default' }

		// if group, create background and foreground elements
		if (tag === 'g') {
			const bg = domCreate(doc, 'path', ns)
			bg.setAttribute('class', 'background')
			node.appendChild(bg)(bg as any).__data__ = item

			const fg = domCreate(doc, 'g', ns)
			node.appendChild(fg)(fg as any).__data__ = item
		}
	}

	// (re-)insert if (a) not contained in SVG or (b) sibling order has changed
	if (
		node.ownerSVGElement !== svg ||
		(hasSiblings(item) && node.previousSibling !== sibling)
	) {
		el.insertBefore(node, sibling ? sibling.nextSibling : el.firstChild)
	}

	return node
}

/*
		const rootElement = this.root
		const svg = this._svg
		const isGroup = scene.type === group

		// const renderer = this,
		//             svg = this._svg,
		//            mdef = marks[scene.marktype],
		//         events = scene.interactive === false ? 'none' : null,
		//            isGroup = mdef.tag === 'g',
		//            sibling = null,
		//            i = 0,
		//            parent

		parent = bind(scene, el, prev, 'g', svg)
		parent.setAttribute('class', cssClass(scene))
		if (!isGroup) {
			parent.style.setProperty('pointer-events', events)
		}
		if (scene.clip) {
			parent.setAttribute('clip-path', clip(renderer, scene, scene.group))
		} else {
			parent.removeAttribute('clip-path')
		}

		function process(item) {
			var dirty = renderer.isDirty(item),
				node = bind(item, parent, sibling, mdef.tag, svg)

			if (dirty) {
				renderer._update(mdef, node, item)
				if (isGroup) recurse(renderer, node, item)
			}

			sibling = node
			++i
		}

		if (mdef.nested) {
			if (scene.items.length) process(scene.items[0])
		} else {
			visit(scene, process)
		}

		domClear(parent, i)
		return parent
	}
}

// Recursively process group contents.
function recurse(renderer: SvgRenderer, el: Element, group: Group) {
	el = el.lastChild
	var prev,
		idx = 0

	visit(group, function(item) {
		prev = renderer.draw(el, item, prev)
		++idx
	})

	// remove any extraneous DOM elements
	domClear(el, 1 + idx)
}

// Bind a scenegraph item to an SVG DOM element.
// Create new SVG elements as needed.
function bind(item, el, sibling, tag, svg) {
	var node = item._svg,
		doc

	// create a new dom node if needed
	if (!node) {
		doc = el.ownerDocument
		node = domCreate(doc, tag, ns)
		item._svg = node

		if (item.mark) {
			node.__data__ = item
			node.__values__ = { fill: 'default' }

			// if group, create background and foreground elements
			if (tag === 'g') {
				var bg = domCreate(doc, 'path', ns)
				bg.setAttribute('class', 'background')
				node.appendChild(bg)
				bg.__data__ = item

				var fg = domCreate(doc, 'g', ns)
				node.appendChild(fg)
				fg.__data__ = item
			}
		}
	}

	// (re-)insert if (a) not contained in SVG or (b) sibling order has changed
	if (
		node.ownerSVGElement !== svg ||
		(hasSiblings(item) && node.previousSibling !== sibling)
	) {
		el.insertBefore(node, sibling ? sibling.nextSibling : el.firstChild)
	}

	return node
}

function hasSiblings(item) {
	var parent = item.mark || item.group
	return parent && parent.items.length > 1
}

/*
prototype.canvas = function() {
	return this._svg
}

prototype.svg = function() {
	if (!this._svg) return null

	var attr = {
		class: 'marks',
		width: this._width * this._scale,
		height: this._height * this._scale,
		viewBox: '0 0 ' + this._width + ' ' + this._height,
	}
	for (var key in metadata) {
		attr[key] = metadata[key]
	}

	var bg = !this._bgcolor
		? ''
		: openTag('rect', {
				width: this._width,
				height: this._height,
				style: 'fill: ' + this._bgcolor + ';',
		  }) + closeTag('rect')

	return openTag('svg', attr) + bg + this._svg.innerHTML + closeTag('svg')
}

// -- Render entry point --

prototype._render = function(scene) {
	// perform spot updates and re-render markup
	if (this._dirtyCheck()) {
		if (this._dirtyAll) this._resetDefs()
		this.draw(this._root, scene)
		domClear(this._root, 1)
	}

	this.updateDefs()

	this._dirty = []
	++this._dirtyID

	return this
}

// -- Manage SVG definitions ('defs') block --

prototype.updateDefs = function() {
	var svg = this._svg,
		defs = this._defs,
		el = defs.el,
		index = 0,
		id

	for (id in defs.gradient) {
		if (!el) defs.el = el = domChild(svg, 0, 'defs', ns)
		updateGradient(el, defs.gradient[id], index++)
	}

	for (id in defs.clipping) {
		if (!el) defs.el = el = domChild(svg, 0, 'defs', ns)
		updateClipping(el, defs.clipping[id], index++)
	}

	// clean-up
	if (el) {
		if (index === 0) {
			svg.removeChild(el)
			defs.el = null
		} else {
			domClear(el, index)
		}
	}
}

function updateGradient(el, grad, index) {
	var i, n, stop

	el = domChild(el, index, 'linearGradient', ns)
	el.setAttribute('id', grad.id)
	el.setAttribute('x1', grad.x1)
	el.setAttribute('x2', grad.x2)
	el.setAttribute('y1', grad.y1)
	el.setAttribute('y2', grad.y2)

	for (i = 0, n = grad.stops.length; i < n; ++i) {
		stop = domChild(el, i, 'stop', ns)
		stop.setAttribute('offset', grad.stops[i].offset)
		stop.setAttribute('stop-color', grad.stops[i].color)
	}
	domClear(el, i)
}

function updateClipping(el, clip, index) {
	var mask

	el = domChild(el, index, 'clipPath', ns)
	el.setAttribute('id', clip.id)

	if (clip.path) {
		mask = domChild(el, 0, 'path', ns)
		mask.setAttribute('d', clip.path)
	} else {
		mask = domChild(el, 0, 'rect', ns)
		mask.setAttribute('x', 0)
		mask.setAttribute('y', 0)
		mask.setAttribute('width', clip.width)
		mask.setAttribute('height', clip.height)
	}
}

prototype._resetDefs = function() {
	var def = this._defs
	def.gradient = {}
	def.clipping = {}
}

// -- Manage rendering of items marked as dirty --

prototype.dirty = function(item) {
	if (item.dirty !== this._dirtyID) {
		item.dirty = this._dirtyID
		this._dirty.push(item)
	}
}

prototype.isDirty = function(item) {
	return this._dirtyAll || !item._svg || item.dirty === this._dirtyID
}

prototype._dirtyCheck = function() {
	this._dirtyAll = true
	var items = this._dirty
	if (!items.length) return true

	var id = ++this._dirtyID,
		item,
		mark,
		type,
		mdef,
		i,
		n,
		o

	for (i = 0, n = items.length; i < n; ++i) {
		item = items[i]
		mark = item.mark

		if (mark.marktype !== type) {
			// memoize mark instance lookup
			type = mark.marktype
			mdef = marks[type]
		}

		if (mark.zdirty && mark.dirty !== id) {
			this._dirtyAll = false
			dirtyParents(item, id)
			mark.items.forEach(function(i) {
				i.dirty = id
			})
		}
		if (mark.zdirty) continue // handle in standard drawing pass

		if (item.exit) {
			// EXIT
			if (mdef.nested && mark.items.length) {
				// if nested mark with remaining points, update instead
				o = mark.items[0]
				if (o._svg) this._update(mdef, o._svg, o)
			} else if (item._svg) {
				// otherwise remove from DOM
				o = item._svg.parentNode
				if (o) o.removeChild(item._svg)
			}
			item._svg = null
			continue
		}

		item = mdef.nested ? mark.items[0] : item
		if (item._update === id) continue // already visited

		if (!item._svg || !item._svg.ownerSVGElement) {
			// ENTER
			this._dirtyAll = false
			dirtyParents(item, id)
		} else {
			// IN-PLACE UPDATE
			this._update(mdef, item._svg, item)
		}
		item._update = id
	}
	return !this._dirtyAll
}

function dirtyParents(item, id) {
	for (; item && item.dirty !== id; item = item.mark.group) {
		item.dirty = id
		if (item.mark && item.mark.dirty !== id) {
			item.mark.dirty = id
		} else return
	}
}

// -- Construct & maintain scenegraph to SVG mapping ---

// Draw a mark container.
prototype.draw = function(el, scene, prev) {
	if (!this.isDirty(scene)) return scene._svg

	var renderer = this,
		svg = this._svg,
		mdef = marks[scene.marktype],
		events = scene.interactive === false ? 'none' : null,
		isGroup = mdef.tag === 'g',
		sibling = null,
		i = 0,
		parent

	parent = bind(scene, el, prev, 'g', svg)
	parent.setAttribute('class', cssClass(scene))
	if (!isGroup) {
		parent.style.setProperty('pointer-events', events)
	}
	if (scene.clip) {
		parent.setAttribute('clip-path', clip(renderer, scene, scene.group))
	} else {
		parent.removeAttribute('clip-path')
	}

	function process(item) {
		var dirty = renderer.isDirty(item),
			node = bind(item, parent, sibling, mdef.tag, svg)

		if (dirty) {
			renderer._update(mdef, node, item)
			if (isGroup) recurse(renderer, node, item)
		}

		sibling = node
		++i
	}

	if (mdef.nested) {
		if (scene.items.length) process(scene.items[0])
	} else {
		visit(scene, process)
	}

	domClear(parent, i)
	return parent
}

// Recursively process group contents.
function recurse(renderer, el, group) {
	el = el.lastChild
	var prev,
		idx = 0

	visit(group, function(item) {
		prev = renderer.draw(el, item, prev)
		++idx
	})

	// remove any extraneous DOM elements
	domClear(el, 1 + idx)
}

// Bind a scenegraph item to an SVG DOM element.
// Create new SVG elements as needed.
function bind(item, el, sibling, tag, svg) {
	var node = item._svg,
		doc

	// create a new dom node if needed
	if (!node) {
		doc = el.ownerDocument
		node = domCreate(doc, tag, ns)
		item._svg = node

		if (item.mark) {
			node.__data__ = item
			node.__values__ = { fill: 'default' }

			// if group, create background and foreground elements
			if (tag === 'g') {
				var bg = domCreate(doc, 'path', ns)
				bg.setAttribute('class', 'background')
				node.appendChild(bg)
				bg.__data__ = item

				var fg = domCreate(doc, 'g', ns)
				node.appendChild(fg)
				fg.__data__ = item
			}
		}
	}

	// (re-)insert if (a) not contained in SVG or (b) sibling order has changed
	if (
		node.ownerSVGElement !== svg ||
		(hasSiblings(item) && node.previousSibling !== sibling)
	) {
		el.insertBefore(node, sibling ? sibling.nextSibling : el.firstChild)
	}

	return node
}

function hasSiblings(item) {
	var parent = item.mark || item.group
	return parent && parent.items.length > 1
}

// -- Set attributes & styles on SVG elements ---

var element = null, // temp var for current SVG element
	values = null // temp var for current values hash

// Extra configuration for certain mark types
var mark_extras = {
	group: function(mdef, el, item) {
		values = el.__values__ // use parent's values hash

		element = el.childNodes[1]
		mdef.foreground(emit, item, this)

		element = el.childNodes[0]
		mdef.background(emit, item, this)

		var value = item.mark.interactive === false ? 'none' : null
		if (value !== values.events) {
			element.style.setProperty('pointer-events', value)
			values.events = value
		}
	},
	text: function(mdef, el, item) {
		var str = textValue(item)
		if (str !== values.text) {
			el.textContent = str
			values.text = str
		}
		str = font(item)
		if (str !== values.font) {
			el.style.setProperty('font', str)
			values.font = str
		}
	},
}

prototype._update = function(mdef, el, item) {
	// set dom element and values cache
	// provides access to emit method
	element = el
	values = el.__values__

	// apply svg attributes
	mdef.attr(emit, item, this)

	// some marks need special treatment
	var extra = mark_extras[mdef.type]
	if (extra) extra.call(this, mdef, el, item)

	// apply svg css styles
	// note: element may be modified by 'extra' method
	this.style(element, item)
}

function emit(name, value, ns) {
	// early exit if value is unchanged
	if (value === values[name]) return

	if (value != null) {
		// if value is provided, update DOM attribute
		if (ns) {
			element.setAttributeNS(ns, name, value)
		} else {
			element.setAttribute(name, value)
		}
	} else {
		// else remove DOM attribute
		if (ns) {
			element.removeAttributeNS(ns, name)
		} else {
			element.removeAttribute(name)
		}
	}

	// note current value for future comparison
	values[name] = value
}

prototype.style = function(el, o) {
	if (o == null) return
	var i, n, prop, name, value

	for (i = 0, n = styleProperties.length; i < n; ++i) {
		prop = styleProperties[i]
		value = o[prop]
		if (value === values[prop]) continue

		name = styles[prop]
		if (value == null) {
			if (name === 'fill') {
				el.style.setProperty(name, 'none')
			} else {
				el.style.removeProperty(name)
			}
		} else {
			if (value.id) {
				// ensure definition is included
				this._defs.gradient[value.id] = value
				value = 'url(' + href() + '#' + value.id + ')'
			}
			el.style.setProperty(name, value + '')
		}

		values[prop] = value
	}
}

function href() {
	var loc
	return typeof window === 'undefined'
		? ''
		: (loc = window.location).hash
			? loc.href.slice(0, -loc.hash.length)
			: loc.href
}

*/
