/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'
import pathParse from '../parse'
import pathRender from '../render'

import { drawCircle } from './drawCircle'
import { drawCross } from './drawCross'
import { drawDiamond } from './drawDiamond'
import { drawSquare } from './drawSquare'
import {
	drawTriangleUp,
	drawTriangleDown,
	drawTriangleLeft,
	drawTriangleRight,
} from './drawTriangle'

export interface SymbolRenderer {
	draw(context: Path, size: number): Path
}

export interface SymbolRenderers {
	byArea: SymbolRenderer
	byWidth: SymbolRenderer
}

export interface SymbolMap {
	[key: string]: SymbolRenderers
}

const getRadius = (area: number) => {
	return Math.sqrt(area) / 2
}

const builtins: SymbolMap = {
	circle: {
		byArea: {
			draw: (ctx: Path, size: number) => drawCircle(ctx, getRadius(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawCircle(ctx, size / 2),
		},
	},
	cross: {
		byArea: {
			draw: (ctx: Path, size: number) => drawCross(ctx, getRadius(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawCross(ctx, size / 2),
		},
	},
	diamond: {
		byArea: {
			draw: (ctx: Path, size: number) => drawDiamond(ctx, getRadius(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawDiamond(ctx, size / 2),
		},
	},
	square: {
		byArea: {
			draw: (ctx: Path, size: number) => drawSquare(ctx, Math.sqrt(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawSquare(ctx, size),
		},
	},
	'triangle-up': {
		byArea: {
			draw: (ctx: Path, size: number) => drawTriangleUp(ctx, Math.sqrt(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawTriangleUp(ctx, size),
		},
	},
	'triangle-down': {
		byArea: {
			draw: (ctx: Path, size: number) => drawTriangleDown(ctx, Math.sqrt(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawTriangleDown(ctx, size),
		},
	},
	'triangle-left': {
		byArea: {
			draw: (ctx: Path, size: number) => drawTriangleLeft(ctx, Math.sqrt(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawTriangleLeft(ctx, size),
		},
	},
	'triangle-right': {
		byArea: {
			draw: (ctx: Path, size: number) =>
				drawTriangleRight(ctx, Math.sqrt(size)),
		},
		byWidth: {
			draw: (ctx: Path, size: number) => drawTriangleRight(ctx, size),
		},
	},
}

export function symbols(symbolName: string) {
	return Object.prototype.hasOwnProperty.call(builtins, symbolName)
		? builtins[symbolName]
		: customSymbol(symbolName)
}

export function symbolsByWidth(symbolName: string) {
	return Object.prototype.hasOwnProperty.call(builtins, symbolName)
		? builtins[symbolName]
		: customSymbol(symbolName)
}

const custom: SymbolMap = {}

export function customSymbol(symbolPath: string) {
	if (!Object.prototype.hasOwnProperty.call(custom, symbolPath)) {
		const parsed = pathParse(symbolPath)

		function drawCustom(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			pathRender(context, parsed, 0, 0, size)
			return context
		}

		custom[symbolPath] = {
			byArea: {
				draw: (context: Path, size: number) =>
					drawCustom(context, getRadius(size)),
			},
			byWidth: {
				draw: drawCustom,
			},
		}
	}

	return custom[symbolPath]
}
