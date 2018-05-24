import { Mark } from '@gog/marks'

// create a new DOM element
export function domCreate(doc: Document, tag: string, ns: string) {
	if (!doc && typeof document !== 'undefined' && document.createElement) {
		doc = document
	}
	if (!doc) {
		throw new Error('doc must be defined')
	}

	return ns ? doc.createElementNS(ns, tag) : doc.createElement(tag)
}

// find first child element with matching tag
export function domFind(el: HTMLElement, tag: string) {
	tag = tag.toLowerCase()
	const nodes = el.childNodes
	const n = nodes.length
	for (let i = 0; i < n; ++i) {
		if (nodes[i].nodeName.toLowerCase() === tag) {
			return nodes[i]
		}
	}
}

// retrieve child element at given index
// create & insert if doesn't exist or if tags do not match
export function domChild(el: Element, index: number, tag: string, ns: string) {
	let a = el.childNodes[index]
	let b
	if (!a || a.nodeName.toLowerCase() !== tag.toLowerCase()) {
		b = a || null
		a = domCreate(el.ownerDocument, tag, ns)
		el.insertBefore(a, b)
	}
	return a
}

// remove all child elements at or above the given index
export function domClear(el: Element, index: number) {
	const nodes = el.childNodes
	let curr = nodes.length
	while (curr > index) {
		el.removeChild(nodes[--curr])
	}
	return el
}

// generate css class name for mark
export function cssClass(mark: Mark) {
	return (
		'mark-' +
		mark.type +
		(mark.metadata.role ? ' role-' + mark.metadata.role : '') +
		(mark.name ? ' ' + mark.name : '')
	)
}
