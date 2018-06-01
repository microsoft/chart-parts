import { Path } from 'd3-path'
import {
	arc as d3_arc,
	symbol as d3_symbol,
	area as d3_area,
	line as d3_line,
	Arc,
	Area,
	DefaultArcObject,
	Line,
	Symbol,
} from 'd3-shape'
import { Rectangle } from './Rectangle'
import { Trail } from './Trail'
import symbols from './symbols'
import {
	ArcItem,
	AreaItem,
	LineItem,
	RectItem,
	TrailItem,
} from '@gog/scenegraph'
import { Interpolation, Orientation } from '@gog/mark-interfaces'

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
function type(item: any) {
	return symbols(item.shape || 'circle')
}

export const rectShape = new Rectangle(x, y, w, h, cr)
export const trailShape = new Trail(x, y, ts, def)

export const arcShape = d3_arc()
	.startAngle(sa)
	.endAngle(ea)
	.padAngle(pa)
	.innerRadius(ir)
	.outerRadius(or)
	.cornerRadius(cr)

export const areavShape = d3_area()
	.x(x)
	.y1(y)
	.y0(yh)
	.defined(def)

export const areahShape = d3_area()
	.y(y)
	.x1(x)
	.x0(xw)
	.defined(def)

export const lineShape = d3_line()
	.x(x)
	.y(y)
	.defined(def)

export const symbolShape = d3_symbol()
	.type(type)
	.size(size)
