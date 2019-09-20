/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Axis, AxisOrientation, ViewSize } from '@chart-parts/interfaces'
import { SceneFrame } from '../context/SceneFrame'
import { AxisSpace } from './interfaces'
import { AxisContext } from './interfaces'

/**
 * @ignore
 */
export function getContext(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): Partial<AxisContext> {
	// Create the new axis space
	const thickness = getThickness(axis, axisSpace)
	const axisFrame = frame.pushView(
		getScaleSize(axis, axisSpace, thickness, frame.view),
		getScaleTL(axis, axisSpace, frame.view),
		getScaleBR(axis, axisSpace, frame.view),
	)

	const scaleName = axis.scale
	const scale = axisFrame.scales[scaleName]
	const range: [number, number] = ((scale.range && scale.range()) as [
		number,
		number,
	]) || [0, 0]

	const horizontal =
		axis.orient === AxisOrientation.Top ||
		axis.orient === AxisOrientation.Bottom

	const topOrLeft =
		axis.orient === AxisOrientation.Top || axis.orient === AxisOrientation.Left

	return {
		axis,
		range,
		scale,
		thickness,
		horizontal,
		topOrLeft,
		frame: axisFrame,
		rangeProperty: horizontal ? 'x' : 'y',
		rangeEndProperty: horizontal ? 'x2' : 'y2',
		crossProperty: horizontal ? 'y' : 'x',
		crossEndProperty: horizontal ? 'y2' : 'x2',
	}
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
