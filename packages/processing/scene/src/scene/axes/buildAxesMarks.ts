import { Axis, MarkType, AxisOrientation, ViewSize } from '@gog/interfaces'
import { buildMark, createItem } from '@gog/scenegraph'
import { SceneFrame } from '../SceneFrame'
import { createDomain } from './createDomain'
import { SGMarkAny } from '../processNode'
import { AxisSpace } from '../../interfaces'
import { AxisContext } from './interfaces'

export function buildAxesMarks(
	frame: SceneFrame,
	axisSpace: AxisSpace,
): SGMarkAny[] {
	return frame.node.axes.map(axis => buildAxisMark(axis, frame, axisSpace))
}

function buildAxisMark(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): SGMarkAny {
	const { orient } = axis
	const thickness = getThickness(axis, axisSpace)
	const groupSize = getGroupSize(axis, thickness, frame.view)

	// Push the space into the frame
	const axisFrame = frame.pushView(
		getScaleSize(axis, axisSpace, thickness, frame.view),
		getScaleTL(axis, axisSpace, frame.view),
		getScaleBR(axis, axisSpace, frame.view),
	)

	const children: SGMarkAny[] = []
	const scaleName = axis.scale
	const scale = axisFrame.scales[scaleName]
	const range: [number, number] = ((scale.range && scale.range()) as [
		number,
		number
	]) || [0, 0]

	const isHorizontal =
		orient === AxisOrientation.Top || orient === AxisOrientation.Bottom

	const context: AxisContext = {
		axis,
		range,
		scale,
		thickness,
		horizontal: isHorizontal,
		rangeStartProperty: isHorizontal ? 'x' : 'y',
		rangeEndProperty: isHorizontal ? 'x2' : 'y2',
		crossProperty: isHorizontal ? 'y' : 'x',
	}

	if (axis.domain) {
		children.push(createDomain(context))
	}

	const axisGroupOrigin = getGroupOrigin(axis, thickness, frame.view)
	return buildMark(MarkType.Group)
		.role('axis')
		.items({
			items: children,
			...axisGroupOrigin,
			...groupSize,
		})
		.build()
}

function getThickness(axis: Axis, space: AxisSpace) {
	switch (axis.orient) {
		case AxisOrientation.Top:
			return space.top
		case AxisOrientation.Right:
			return space.right
		case AxisOrientation.Bottom:
			return space.bottom
		case AxisOrientation.Left:
			return space.left
		default:
			return 0
	}
}

function getGroupOrigin(
	axis: Axis,
	axisThickness: number,
	availableSpace: ViewSize,
) {
	const { height: viewHeight = 0, width: viewWidth = 0 } = availableSpace
	switch (axis.orient) {
		case AxisOrientation.Top:
			return { x: 0, y: 0 }
		case AxisOrientation.Bottom:
			return {
				x: 0,
				y: viewHeight - axisThickness,
			}
		case AxisOrientation.Left:
			return { x: 0, y: 0 }
		case AxisOrientation.Right:
			return { x: viewWidth - axisThickness, y: 0 }
	}
}

function getGroupSize(
	axis: Axis,
	axisThickness: number,
	availableSpace: ViewSize,
) {
	const { height: viewHeight = 0, width: viewWidth = 0 } = availableSpace

	const isHorizontal =
		axis.orient === AxisOrientation.Top ||
		axis.orient === AxisOrientation.Bottom
	if (isHorizontal) {
		return {
			width: viewWidth,
			height: axisThickness,
		}
	} else {
		return {
			width: axisThickness,
			height: viewHeight,
		}
	}
}

function getScaleTL(
	axis: Axis,
	space: AxisSpace,
	availableSpace: ViewSize,
): [number, number] {
	const { width, height } = availableSpace
	const { left, top, bottom, right } = space

	switch (axis.orient) {
		case AxisOrientation.Top:
			return [0, left]
		case AxisOrientation.Bottom:
			return [height - bottom, left]
		case AxisOrientation.Left:
			return [top, 0]
		case AxisOrientation.Right:
			return [top, width - right]
	}
}

function getScaleBR(
	axis: Axis,
	space: AxisSpace,
	availableSpace: ViewSize,
): [number, number] {
	const { width, height } = availableSpace
	const { left, top, bottom, right } = space

	switch (axis.orient) {
		case AxisOrientation.Top:
			return [top, width - right]
		case AxisOrientation.Bottom:
			return [height, width - right]
		case AxisOrientation.Left:
			return [height - bottom, left]
		case AxisOrientation.Right:
			return [height - bottom, width]
	}
}

function getScaleSize(
	axis: Axis,
	space: AxisSpace,
	axisThickness: number,
	availableSpace: ViewSize,
) {
	const { left, right, top, bottom } = space
	const { height: viewHeight = 0, width: viewWidth = 0 } = availableSpace
	const isHorizontal =
		axis.orient === AxisOrientation.Top ||
		axis.orient === AxisOrientation.Bottom
	if (isHorizontal) {
		return {
			width: viewWidth - left - right,
			height: axisThickness,
		}
	} else {
		return {
			width: axisThickness,
			height: viewHeight - top - bottom,
		}
	}
}
