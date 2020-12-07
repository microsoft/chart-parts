/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	arc as d3Arc,
	symbol as d3Symbol,
	area as d3Area,
	line as d3Lines,
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
import { symbols } from './symbols'

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

/**
 * Extracts the symbol "size" from a scenegraph item - this is expressed as an area
 * @param item The scenegraph item to inspect
 */
const symbolSize = (item: SGSymbolItem) => (item.size == null ? 64 : item.size)

/**
 * Extracts the symbol "width" from a scenegraph item.
 * @param item The scenegraph item to inspect
 */
const symbolWidth = (item: SGSymbolItem) =>
	item.width == null ? 8 : item.width

const rendererByArea = (item: SGSymbolItem) =>
	symbols(item.shape || 'circle').byArea

const rendererByWidth = (item: SGSymbolItem) =>
	symbols(item.shape || 'circle').byWidth

export const rectShape = new Rectangle(x, y, w, h, cr)

export const arcShape = d3Arc<SGArcItem>()
	.startAngle(sa)
	.endAngle(ea)
	.padAngle(pa)
	.innerRadius(ir)
	.outerRadius(or)
	.cornerRadius(cr)

export const areahShape = d3Area<SGAreaItem>()
	.x1(x)
	.x0(x2)
	.y(y)
	.defined(def)

export const areavShape = d3Area<SGAreaItem>()
	.y1(y)
	.y0(y2)
	.x(x)
	.defined(def)

export const lineShape = d3Lines<SGLineItem>()
	.x(x)
	.y(y)
	.defined(def)

export const symbolWithArea = d3Symbol<SGSymbolItem>()
	.type(rendererByArea)
	.size(symbolSize)

export const symbolWithWidth = d3Symbol<SGSymbolItem>()
	.type(rendererByWidth)
	.size(symbolWidth)
