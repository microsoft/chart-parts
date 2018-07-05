import { Axis, MarkType, AxisOrientation } from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { AxisContext } from '../interfaces'

const DEFAULT_DOMAIN_WIDTH = 0.5
const DEFAULT_DOMAIN_COLOR = '#555'
const BLEED = 0.5

export function createDomain({
	axis,
	range,
	rangeStartProperty,
	rangeEndProperty,
	crossStartProperty,
	thickness,
}: AxisContext) {
	const maxRange = Math.max(...range)
	const minRange = Math.min(...range)

	return buildMark(MarkType.Rule)
		.role('axis-domain')
		.items({
			stroke: stroke(axis),
			strokeWidth: strokeWidth(axis),
			[rangeStartProperty]: minRange - BLEED,
			[rangeEndProperty]: maxRange + BLEED,
			[crossStartProperty]: crossValue(axis, thickness),
		})
		.build()
}

const stroke = (axis: Axis) => axis.domainColor || DEFAULT_DOMAIN_COLOR
const strokeWidth = (axis: Axis) => axis.domainWidth || DEFAULT_DOMAIN_WIDTH

function crossValue(axis: Axis, thickness: number): number {
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
