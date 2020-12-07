/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { path, Path } from 'd3-path'
import { SGRectItem } from '@chart-parts/interfaces'
import { Xform } from './util'

export class Rectangle {
	public constructor(
		public x: Xform<SGRectItem, number> = d => d.x || 0,
		public y: Xform<SGRectItem, number> = d => d.y || 0,
		public width: Xform<SGRectItem, number> = d => d.width || 0,
		public height: Xform<SGRectItem, number> = d => d.height || 0,
		public cornerRadius: Xform<SGRectItem, number> = d => d.cornerRadius || 0,
	) {}

	/**
	 * Draws out the Rectangle Shape
	 * @param d The bound datum
	 * @param x0 The offset x
	 * @param y0 The offset y
	 * @param context The drawing context (compatible with Canvas2DRenderingContext)
	 *
	 */
	public build(d: SGRectItem, x0?: number, y0?: number, context?: Path): Path {
		const { x, y, width, height, cornerRadius } = this
		const x1 = x0 != null ? x0 : +x(d)
		const y1 = y0 != null ? y0 : +y(d)
		const w = +width(d)
		const h = +height(d)
		const cr = +cornerRadius(d)

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
