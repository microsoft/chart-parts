import {
	arc as d3_arc,
	symbol as d3_symbol,
	area as d3_area,
	line as d3_line,
} from 'd3-shape'
import { Rectangle } from './Rectangle'
import { Trail } from './Trail'
import symbols from './symbols'
import {
	SGItem,
	SGTrailItem,
	SGArcItem,
	SGRectItem,
	SGGroupItem,
	SGAreaItem,
	SGLineItem,
	SGSymbolItem,
} from '@markable/interfaces'

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
const def = (item: SGAreaItem | SGLineItem | SGTrailItem) =>
	item.defined || false
const symbolSize = (item: SGSymbolItem) => (item.size == null ? 64 : item.size)
const symbolType = (item: SGSymbolItem) => symbols(item.shape || 'circle')
const trailSize = (item: SGTrailItem) => item.size || 1

export const rectShape = new Rectangle(x, y, w, h, cr)
export const trailShape = new Trail(x, y, trailSize, def)

export const arcShape = d3_arc<SGItem>()
	.startAngle(sa)
	.endAngle(ea)
	.padAngle(pa)
	.innerRadius(ir)
	.outerRadius(or)
	.cornerRadius(cr)

export const areavShape = d3_area<SGItem>()
	.y(y)
	.x0(x2)
	.x1(x)
	.defined(def)

export const areahShape = d3_area<SGItem>()
	// interval dimension
	.x(x)
	// baseline
	.y0(y2)
	// topline
	.y1(y)
	.defined(def)

export const lineShape = d3_line<SGItem>()
	.x(x)
	.y(y)
	.defined(def)

export const symbolShape = d3_symbol<SGItem>()
	.type(symbolType)
	.size(symbolSize)
