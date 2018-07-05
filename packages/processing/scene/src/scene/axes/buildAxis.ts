import { Axis, MarkType, AxisOrientation, ViewSize } from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { SceneFrame } from '../SceneFrame'
import { createDomain } from './components/domain'
import { createTickLines } from './components/tickLines'
import { createTickLabels } from './components/tickLabels'
import { SGMarkAny } from '../processNode'
import { AxisSpace } from '../../interfaces'
import { getContext } from './getContext'
import { AxisContext } from './interfaces'

export function buildAxis(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): SGMarkAny {
	const context = getContext(axis, frame, axisSpace)
	const groupSize = getGroupSize(context, frame.view)
	const origin = getGroupOrigin(context, frame.view)

	// Build the components of the axis
	const items: SGMarkAny[] = []
	if (axis.domain) {
		items.push(createDomain(context))
	}
	if (axis.ticks) {
		items.push(createTickLines(context))
	}
	if (axis.labels) {
		items.push(createTickLabels(context))
	}

	return buildMark(MarkType.Group)
		.role('axis')
		.items({
			items,
			x: origin.x,
			y: origin.y,
			...groupSize,
		})
		.build()
}

function getGroupOrigin(context: AxisContext, availableSpace: ViewSize) {
	const { height = 0, width = 0 } = availableSpace
	switch (context.axis.orient) {
		case AxisOrientation.Top:
			return { x: 0, y: 0 }
		case AxisOrientation.Bottom:
			return {
				x: 0,
				y: height - context.thickness,
			}
		case AxisOrientation.Left:
			return { x: 0, y: 0 }
		case AxisOrientation.Right:
			return { x: width - context.thickness, y: 0 }
	}
}

function getGroupSize(context: AxisContext, availableSpace: ViewSize) {
	const { height = 0, width = 0 } = availableSpace
	if (context.horizontal) {
		return {
			width,
			height: context.thickness,
		}
	} else {
		return {
			width: context.thickness,
			height,
		}
	}
}
