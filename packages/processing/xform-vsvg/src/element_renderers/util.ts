import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'

/**
 * Perform an invariant assertion that a mark is of a given type
 * @param mark The mark to inspect
 * @param itemType The expected item type
 */
export function assertTypeIs(mark: SGMark<any>, itemType: string) {
	if (mark.marktype !== itemType) {
		throw new Error(`
            Tried to render a mark with the incorrect mark renderer. 
            Mark must be of type ${itemType}.
        `)
	}
}

function roleClass(role?: string) {
	return `role-${role || 'mark'}`
}

/**
 *
 * @param marktype
 * @param children
 */
export function emitMarkGroup(
	marktype: string,
	role: string | undefined,
	children: VSvgNode[],
): VSvgNode[] {
	const markGroup: VSvgNode = {
		type: 'g',
		attrs: {
			className: `mark-${marktype} ${roleClass(role)}`,
		},
		children,
	}
	return [markGroup]
}

/**
 * Copies shared vsvg props from the given mark into the vsvg node
 * @param item The mark item to copy from
 * @param result The vsvg node to copy into
 */
export function commonProps(item: SGItem): any {
	const result: { [key: string]: any } = {}

	if (item.fill !== undefined) {
		result.fill = item.fill
	}

	if (item.fillOpacity !== undefined) {
		result.fillOpacity = item.fillOpacity
	}

	if (item.stroke !== undefined) {
		result.stroke = item.stroke
	}

	if (item.strokeWidth !== undefined) {
		result.strokeWidth = item.strokeWidth
	}

	if (item.strokeOpacity !== undefined) {
		result.strokeOpacity = item.strokeOpacity
	}

	if (item.strokeJoin !== undefined) {
		result.strokeLinejoin = item.strokeJoin
	}

	if (item.strokeCap !== undefined) {
		result.strokeLinecap = item.strokeCap
	}

	if (item.strokeDash !== undefined) {
		result.strokeDasharray = item.strokeDash
	}

	if (item.strokeDashOffset !== undefined) {
		result.strokeDashoffset = item.strokeDashOffset
	}

	return result
}

/**
 * For marks that support width and height settings (including rect and area),
 * the horizontal dimensions are determined (in order of precedence) by the x and x2 properties,
 * the x and width properties, the x2 and width properties, or the xc and width properties.
 * If all three of x, x2 and width are specified, the width value is ignored.
 * The y, y2, yc and height properties are treated similarly.
 * @param item
 */
export function getItemSpace(item: SGItem) {
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
			x: originX,
			y: originY,
		},
		shape: {
			width: resultWidth,
			height: resultHeight,
		},
	}
}
