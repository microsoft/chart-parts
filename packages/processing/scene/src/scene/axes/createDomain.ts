import { Axis, MarkType, AxisOrientation } from '@gog/interfaces'
import { createMark, createItem } from '@gog/scenegraph'
import { AxisContext } from './interfaces'

const DEFAULT_DOMAIN_WIDTH = 1

export function createDomain({
	axis,
	range,
	rangeStartProperty,
	rangeEndProperty,
	crossProperty,
	thickness,
}: AxisContext) {
	const maxRange = Math.max(...range)
	const minRange = Math.min(...range)
	return createMark(MarkType.Rule, [
		createItem(MarkType.Rule, {
			stroke: axis.domainColor,
			strokeWidth: axis.domainWidth,
			[rangeStartProperty]: minRange - 1,
			[rangeEndProperty]: maxRange + 1,
			[crossProperty]: getCrossValue(axis, thickness),
		}),
	])
}

function getCrossValue(axis: Axis, thickness: number): number {
	const { domainWidth, orient } = axis
	let result = DEFAULT_DOMAIN_WIDTH
	switch (orient) {
		case AxisOrientation.Bottom: {
			result = domainWidth || DEFAULT_DOMAIN_WIDTH
			break
		}
		case AxisOrientation.Left: {
			result = thickness - (domainWidth || DEFAULT_DOMAIN_WIDTH)
			break
		}
		case AxisOrientation.Right: {
			result = domainWidth || DEFAULT_DOMAIN_WIDTH
			break
		}
		case AxisOrientation.Top: {
			result = thickness - (domainWidth || DEFAULT_DOMAIN_WIDTH)
			break
		}
	}
	return result
}
