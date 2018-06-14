import { path, Path } from 'd3-path'
import { SGTrailItem } from '@gog/scenegraph-interfaces'
import { Xform } from './util'

const pi = Math.PI

export class Trail {
	constructor(
		public x: Xform<SGTrailItem, number> = d => d.x || 0,
		public y: Xform<SGTrailItem, number> = d => d.y || 0,
		public size: Xform<SGTrailItem, number> = d => d.size || 0,
		public defined: Xform<SGTrailItem, boolean>,
	) {}

	public build(data: SGTrailItem[], context: Path = path()) {
		let prevX: number
		let prevY: number
		let prevR: number
		let ready = false
		let isLastDefined = false

		/**
		 * Emits a point in the stream
		 * @param x The x value
		 * @param y The y value
		 * @param w The width at the point
		 */
		const emitPoint = (x: number, y: number, w: number) => {
			const r2 = w / 2

			if (ready) {
				let ux = prevY - y
				let uy = x - prevX

				if (ux || uy) {
					// get normal vector
					const ud = Math.sqrt(ux * ux + uy * uy)
					const rx = (ux /= ud) * prevR
					const ry = (uy /= ud) * prevR
					const t = Math.atan2(uy, ux)

					// draw segment
					context.moveTo(prevX - rx, prevY - ry)
					context.lineTo(x - ux * r2, y - uy * r2)
					context.arc(x, y, r2, t - pi, t)
					context.lineTo(prevX + rx, prevY + ry)
					context.arc(prevX, prevY, prevR, t, t + pi)
				} else {
					context.arc(x, y, r2, 0, 2 * pi)
				}
				context.closePath()
			} else {
				ready = true
			}

			// Set Previous Values
			prevX = x
			prevY = y
			prevR = r2
		}

		data.forEach((d, i) => {
			const isDefined = this.defined(d, i, data)
			if (isDefined !== isLastDefined) {
				isLastDefined = isDefined
				ready = false
			}

			if (isLastDefined) {
				emitPoint(
					+this.x(d, i, data),
					+this.y(d, i, data),
					+this.size(d, i, data),
				)
			}
		})

		return context
	}
}
