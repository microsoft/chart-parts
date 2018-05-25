import { path, Path } from 'd3-path'
import { Item } from '@gog/marks'

export type ItemRetriever = (d: Item) => number
const rectangleX = (d: Item) => d.x as number
const rectangleY = (d: Item) => d.y as number
const rectangleWidth = (d: Item) => d.width as number
const rectangleHeight = (d: Item) => d.height as number
const constant = (value: number) => (d?: Item) => value

export class Rectangle {
	constructor(
		private _x: ItemRetriever,
		private _y: ItemRetriever,
		private _width: ItemRetriever,
		private _height: ItemRetriever,
		private _cornerRadius: ItemRetriever,
	) {}

	public x(_: any) {
		if (arguments.length) {
			this.x = typeof _ === 'function' ? _ : constant(+_)
			return this
		} else {
			return this.x
		}
	}

	public y(_: any) {
		if (arguments.length) {
			this.y = typeof _ === 'function' ? _ : constant(+_)
			return this
		} else {
			return this.y
		}
	}

	public width(_: any) {
		if (arguments.length) {
			this.width = typeof _ === 'function' ? _ : constant(+_)
			return this
		} else {
			return this.width
		}
	}

	public height(_: any) {
		if (arguments.length) {
			this.height = typeof _ === 'function' ? _ : constant(+_)
			return this
		} else {
			return this.height
		}
	}

	public cornerRadius(_: any) {
		if (arguments.length) {
			this.cornerRadius = typeof _ === 'function' ? _ : constant(+_)
			return this
		} else {
			return this.cornerRadius
		}
	}

	public build(
		datum: any,
		x0?: number,
		y0?: number,
		context?: Path | undefined,
	): string {
		// tslint:disable-next-line no-this-assignment
		const { x, y, width, height, cornerRadius } = this
		const x1 = x0 != null ? x0 : +x(datum)
		const y1 = y0 != null ? y0 : +y(datum)
		const w = +width(datum)
		const h = +height(datum)
		const cr = +cornerRadius(datum)

		if (!context) {
			context = path()
		}

		if (cr <= 0) {
			context.rect(x1, y1, w, h)
		} else {
			const x2 = x1 + w
			const y2 = y1 + h
			context.moveTo(x1 + cr, y1)
			context.lineTo(x2 - cr, y1)
			context.quadraticCurveTo(x2, y1, x2, y1 + cr)
			context.lineTo(x2, y2 - cr)
			context.quadraticCurveTo(x2, y2, x2 - cr, y2)
			context.lineTo(x1 + cr, y2)
			context.quadraticCurveTo(x1, y2, x1, y2 - cr)
			context.lineTo(x1, y1 + cr)
			context.quadraticCurveTo(x1, y1, x1 + cr, y1)
			context.closePath()
		}

		return context + ''
	}
}

export default function makeRectangle() {
	return new Rectangle(
		rectangleX,
		rectangleY,
		rectangleWidth,
		rectangleHeight,
		constant(0),
	)
}
