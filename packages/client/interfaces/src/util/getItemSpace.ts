/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGItem } from '../scenegraph'

/**
 * For marks that support width and height settings (including rect and area),
 * the horizontal dimensions are determined (in order of precedence) by the x and x2 properties,
 * the x and width properties, the x2 and width properties, or the xc and width properties.
 * If all three of x, x2 and width are specified, the width value is ignored.
 * The y, y2, yc and height properties are treated similarly.
 * @param item
 */
export function getItemSpace(item: SGItem): ItemSpace {
	const { x, xc, x2, y, yc, y2, width, height } = item
	const computeDimension = (
		low: number | undefined,
		high: number | undefined,
		center: number | undefined,
		span: number | undefined,
	) => {
		let origin: number | undefined
		let resultSpan: number | undefined

		// Snap dimensions to lower-bound first.
		// Then try to snap to the upper bound.
		// Then, if those don't exist, try to snap to the center and span
		if (low !== undefined) {
			if (high !== undefined) {
				origin = Math.min(low, high)
				resultSpan = Math.abs(high - low)
			} else if (span !== undefined) {
				origin = low
				resultSpan = span
			} else if (center !== undefined) {
				origin = Math.min(low, center)
				resultSpan = Math.abs(center - low) * 2
			} else {
				origin = low
			}
		} else if (high !== undefined) {
			if (span !== undefined) {
				origin = high - span
				resultSpan = span
			} else if (center !== undefined) {
				resultSpan = Math.abs(high - center) * 2
				origin =
					center < high ? high - (high - center) * 2 : center - (center - high)
			}
		} else if (span !== undefined && center !== undefined) {
			origin = center - span / 2
			resultSpan = span
		}
		return [origin, resultSpan]
	}

	const [originX, resultWidth] = computeDimension(x, x2, xc, width)
	const [originY, resultHeight] = computeDimension(y, y2, yc, height)
	return {
		origin: {
			x: originX || 0,
			y: originY || 0,
		},
		shape: {
			width: resultWidth,
			height: resultHeight,
		},
	}
}

export interface ItemSpace {
	origin: {
		x: number
		y: number
	}
	shape: {
		width: number | undefined
		height: number | undefined
	}
}
