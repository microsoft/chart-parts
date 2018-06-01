import pathParse from './parse'
import pathRender from './render'

const tau = 2 * Math.PI
const halfSqrt3 = Math.sqrt(3) / 2

const builtins = {
	circle: {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			context.moveTo(r, 0)
			context.arc(0, 0, r, 0, tau)
		},
	},
	cross: {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
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
		},
	},
	diamond: {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			context.moveTo(-r, 0)
			context.lineTo(0, -r)
			context.lineTo(r, 0)
			context.lineTo(0, r)
			context.closePath()
		},
	},
	square: {
		draw(context, size) {
			const w = Math.sqrt(size)
			const x = -w / 2
			context.rect(x, x, w, w)
		},
	},
	'triangle-up': {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			const h = halfSqrt3 * r
			context.moveTo(0, -h)
			context.lineTo(-r, h)
			context.lineTo(r, h)
			context.closePath()
		},
	},
	'triangle-down': {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			const h = halfSqrt3 * r
			context.moveTo(0, h)
			context.lineTo(-r, -h)
			context.lineTo(r, -h)
			context.closePath()
		},
	},
	'triangle-right': {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			const h = halfSqrt3 * r
			context.moveTo(h, 0)
			context.lineTo(-h, -r)
			context.lineTo(-h, r)
			context.closePath()
		},
	},
	'triangle-left': {
		draw(context, size) {
			const r = Math.sqrt(size) / 2
			const h = halfSqrt3 * r
			context.moveTo(-h, 0)
			context.lineTo(h, -r)
			context.lineTo(h, r)
			context.closePath()
		},
	},
}

export default function symbols(_) {
	return builtins.hasOwnProperty(_) ? builtins[_] : customSymbol(_)
}

const custom = {}

function customSymbol(path) {
	if (!custom.hasOwnProperty(path)) {
		const parsed = pathParse(path)
		custom[path] = {
			draw(context, size) {
				pathRender(context, parsed, 0, 0, Math.sqrt(size) / 2)
			},
		}
	}
	return custom[path]
}
