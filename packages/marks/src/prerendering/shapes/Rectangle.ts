import { path, Path } from 'd3-path'
import { RectItem } from '../../scenegraph'

export type ValueRetriever = (d: RectItem) => number

export class Rectangle {
	constructor(
		public x: ValueRetriever = d => d.x || 0,
		public y: ValueRetriever = d => d.y || 0,
		public width: ValueRetriever = d => d.width || 0,
		public height: ValueRetriever = d => d.height || 0,
		public cornerRadius: ValueRetriever = d => d.cornerRadius || 0,
	) {}

	/**
	 * Draws out the Rectangle Shape
	 * @param datum
	 * @param x0 The offset x
	 * @param y0 The offset y
	 * @param context The drawing context (compatible with Canvas2DRenderingContext)
	 *
	 */
	public build(
		datum: RectItem,
		x0?: number,
		y0?: number,
		context?: Path,
	): Path {
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

		return context
	}
}
