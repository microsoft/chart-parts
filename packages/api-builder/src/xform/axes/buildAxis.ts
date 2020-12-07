/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	Axis,
	MarkType,
	AxisOrientation,
	ViewSize,
} from '@chart-parts/interfaces'
import { buildMark } from '@chart-parts/scenegraph'
import { SceneFrame } from '../context/SceneFrame'
import { components } from './components'
import { SGMarkAny } from '../processNode'
import { AxisSpace } from './interfaces'
import { getContext } from './getContext'
import { AxisContext } from './interfaces'

/**
 * @ignore
 */
export function buildAxis(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): SGMarkAny {
	const context = createPopulatedContext(axis, frame, axisSpace)
	const groupSize = getGroupSize(context, frame.view)
	const origin = getGroupOrigin(context, frame.view)

	// Build the components of the axis
	const items: SGMarkAny[] = []
	components.forEach(e => {
		if (e.isScenegraphElementGenerated(context)) {
			items.push(e.createScenegraphElement(context))
		}
	})

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

function createPopulatedContext(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): AxisContext {
	const initialContext = getContext(axis, frame, axisSpace)

	let result = initialContext
	components.forEach(component => (result = component.createContext(result)))
	return result as AxisContext
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
