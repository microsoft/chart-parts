import {
	arc as d3_arc,
	symbol as d3_symbol,
	area as d3_area,
	line as d3_line,
} from 'd3-shape'
import {
	SGItem,
	SGAreaItem,
	SGLineItem,
	SGSymbolItem,
	SGArcItem,
	SGRectItem,
	SGGroupItem,
} from '@chart-parts/interfaces'
import { Rectangle } from './Rectangle'
import symbols from './symbols'

const x = (item: SGItem) => item.x || 0
const x2 = (item: SGItem) => item.x2 || 0
const y = (item: SGItem) => item.y || 0
const y2 = (item: SGItem) => item.y2 || 0
const w = (item: SGItem) => item.width || 0
const h = (item: SGItem) => item.height || 0
const sa = (item: SGArcItem) => item.startAngle || 0
const ea = (item: SGArcItem) => item.endAngle || 0
const pa = (item: SGArcItem) => item.padAngle || 0
const ir = (item: SGArcItem) => item.innerRadius || 0
const or = (item: SGArcItem) => item.outerRadius || 0
const cr = (item: SGArcItem | SGRectItem | SGGroupItem) =>
	item.cornerRadius || 0
const def = (item: SGAreaItem | SGLineItem) =>
	item.defined == null ? true : item.defined
const symbolSize = (item: SGSymbolItem) => (item.size == null ? 64 : item.size)
const symbolType = (item: SGSymbolItem) => symbols(item.shape || 'circle')

export const rectShape = new Rectangle(x, y, w, h, cr)

export const arcShape = d3_arc<SGArcItem>()
	.startAngle(sa)
	.endAngle(ea)
	.padAngle(pa)
	.innerRadius(ir)
	.outerRadius(or)
	.cornerRadius(cr)

export const areahShape = d3_area<SGAreaItem>()
	.x1(x)
	.x0(x2)
	.y(y)
	.defined(def)

export const areavShape = d3_area<SGAreaItem>()
	.y1(y)
	.y0(y2)
	.x(x)
	.defined(def)

export const lineShape = d3_line<SGLineItem>()
	.x(x)
	.y(y)
	.defined(def)

export const symbolShape = d3_symbol<SGSymbolItem>()
	.type(symbolType)
	.size(symbolSize)
