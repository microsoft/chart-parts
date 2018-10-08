import { Path, path } from 'd3-path'
import pathParse from './parse'
import pathRender from './render'

const tau = 2 * Math.PI
const halfSqrt3 = Math.sqrt(3) / 2

export interface SymbolRenderer {
	draw(context: Path, size: number): Path
}

export interface SymbolMap {
	[key: string]: SymbolRenderer
}

const builtins: SymbolMap = {
	circle: {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			context.moveTo(r, 0)
			context.arc(0, 0, r, 0, tau)
			return context
		},
	},
	cross: {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			const s = r / 2.5
			context.moveTo(-r, -s)
			context.lineTo(-r, s)
			context.lineTo(-s, s)
			context.lineTo(-s, r)
			context.lineTo(s, r)
			context.lineTo(s, s)
			context.lineTo(r, s)
			context.lineTo(r, -s)
			context.lineTo(s, -s)
			context.lineTo(s, -r)
			context.lineTo(-s, -r)
			context.lineTo(-s, -s)
			context.closePath()
			return context
		},
	},
	diamond: {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			context.moveTo(-r, 0)
			context.lineTo(0, -r)
			context.lineTo(r, 0)
			context.lineTo(0, r)
			context.closePath()
			return context
		},
	},
	square: {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const w = size
			const x = -w / 2
			context.rect(x, x, w, w)
			return context
		},
	},
	'triangle-up': {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			const h = halfSqrt3 * r
			context.moveTo(0, -h)
			context.lineTo(-r, h)
			context.lineTo(r, h)
			context.closePath()
			return context
		},
	},
	'triangle-down': {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			const h = halfSqrt3 * r
			context.moveTo(0, h)
			context.lineTo(-r, -h)
			context.lineTo(r, -h)
			context.closePath()
			return context
		},
	},
	'triangle-right': {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			const h = halfSqrt3 * r
			context.moveTo(h, 0)
			context.lineTo(-h, -r)
			context.lineTo(-h, r)
			context.closePath()
			return context
		},
	},
	'triangle-left': {
		draw(context: Path, size: number) {
			if (!context) {
				context = path()
			}
			const r = size / 2
			const h = halfSqrt3 * r
			context.moveTo(-h, 0)
			context.lineTo(h, -r)
			context.lineTo(h, r)
			context.closePath()
			return context
		},
	},
}

export default function symbols(symbolName: string) {
	return builtins.hasOwnProperty(symbolName)
		? builtins[symbolName]
		: customSymbol(symbolName)
}

const custom: SymbolMap = {}

function customSymbol(symbolPath: string) {
	if (!custom.hasOwnProperty(symbolPath)) {
		const parsed = pathParse(symbolPath)
		custom[symbolPath] = {
			draw(context: Path, size: number) {
				if (!context) {
					context = path()
				}
				pathRender(context, parsed, 0, 0, Math.sqrt(size) / 2)
				return context
			},
		}
	}
	return custom[symbolPath]
}
