import { Axis, MarkType, AxisOrientation } from '@gog/interfaces'
import { createMark, createItem } from '@gog/scenegraph'
import { AxisContext } from './interfaces'

export function createDomain({
	axis,
	range,
	rangeStartProperty,
	rangeEndProperty,
	crossProperty,
	thickness,
}: AxisContext) {
	return createMark(MarkType.Rule, [
		createItem(MarkType.Rule, {
			stroke: axis.domainColor,
			strokeWidth: axis.domainWidth,
			strokeJoin: 'round',
			[rangeStartProperty]: Math.floor(range[0]),
			[rangeEndProperty]: Math.floor(range[1]),
			[crossProperty]: getCrossValue(axis, thickness),
		}),
	])
}

function getCrossValue(axis: Axis, thickness: number) {
	const { domainWidth, orient } = axis
	switch (orient) {
		case AxisOrientation.Bottom:
			return domainWidth
		case AxisOrientation.Left:
			return thickness - (domainWidth || 1)
	}
}
