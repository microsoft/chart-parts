import { Path } from 'd3-path'
import { Rectangle } from '../../shapes'
import curves from './curves'

// import symbols from './symbols'

// import { default as vg_trail } from './trail'
/*
import {
	arc as d3_arc,
	symbol as d3_symbol,
	area as d3_area,
	line as d3_line,
} from 'd3-shape'
*/

function x(item: any) {
	return item.x || 0
}
function y(item: any) {
	return item.y || 0
}
function w(item: any) {
	return item.width || 0
}
function ts(item: any) {
	return item.size || 1
}
function h(item: any) {
	return item.height || 0
}
function xw(item: any) {
	return (item.x || 0) + (item.width || 0)
}
function yh(item: any) {
	return (item.y || 0) + (item.height || 0)
}
function sa(item: any) {
	return item.startAngle || 0
}
function ea(item: any) {
	return item.endAngle || 0
}
function pa(item: any) {
	return item.padAngle || 0
}
function ir(item: any) {
	return item.innerRadius || 0
}
function or(item: any) {
	return item.outerRadius || 0
}
function cr(item: any) {
	return item.cornerRadius || 0
}
function def(item: any) {
	return !(item.defined === false)
}
function size(item: any) {
	return item.size == null ? 64 : item.size
}

const rectShape = new Rectangle(x, y, w, h, cr)

/*
function type(item: any) {
	return symbols(item.shape || 'circle')
}
*/

/*
const arcShape = d3_arc()
	.startAngle(sa)
	.endAngle(ea)
	.padAngle(pa)
	.innerRadius(ir)
	.outerRadius(or)
	.cornerRadius(cr)

const areavShape = d3_area()
	.x(x)
	.y1(y)
	.y0(yh)
	.defined(def)

const areahShape = d3_area()
	.y(y)
	.x1(x)
	.x0(xw)
	.defined(def)

const lineShape = d3_line()
	.x(x)
	.y(y)
	.defined(def)


/*
const symbolShape = d3_symbol()
	.type(type)
	.size(size)
	*/

/*
const trailShape = vg_trail()
	.x(x)
	.y(y)
	.defined(def)
	.size(ts)
	*/
/*
export function arc(context: any, item: any) {
	return arcShape.context(context)(item)
}

export function area(context: any, items: any) {
	const item = items[0]
	const interp = item.interpolate || 'linear'

	return (item.orient === 'horizontal' ? areahShape : areavShape)
		.curve(curves(interp, item.orient, item.tension))
		.context(context)(items)
}

export function line(context: any, items: any) {
	const item = items[0]
	const interp = item.interpolate || 'linear'
	return lineShape
		.curve(curves(interp, item.orient, item.tension))
		.context(context)(items)
}
export function shape(context: any, item: any) {
	return (item.mark.shape || item.shape).context(context)(item)
}

/*
export function symbol(context: any, item: any) {
	return symbolShape.context(context)(item)
}
*/

/*
export function trail(context: any, items: any) {
	return trailShape.context(context)(items)
}
*/

export function rectangle(context: any, item: any, xOffset: any, yOffset: any) {
	return rectShape.build(item, xOffset, yOffset)
}
