/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { buildMark } from '@chart-parts/scenegraph'
import {
	AxisComponent,
	AxisContext,
	PositionedTickValue,
} from '../../interfaces'
import { getTickValues } from './getTickValues'
import { getLabelFormatter } from './getLabelFormatter'

/**
 * @ignore
 */
export class TickLines implements AxisComponent {
	public createContext(context: AxisContext) {
		const tickCrossStart = getTickCrossStart(context as AxisContext)
		const tickCrossEnd = getTickCrossEnd(context as AxisContext)
		const labelFormatter = getLabelFormatter(context)
		context = { ...context, labelFormatter, tickCrossEnd, tickCrossStart }
		const ticks = getTickValues(context as AxisContext)
		context = { ...context, ticks }
		return context
	}

	public isScenegraphElementGenerated(context: AxisContext): boolean {
		return !!context.axis.ticks
	}

	public createScenegraphElement(context: AxisContext) {
		return buildMark(MarkType.Rule)
			.role('axis-ticks')
			.items(...context.ticks.map(tick => createTickItem(tick, context)))
			.build()
	}
}

function getTickCrossStart(context: AxisContext) {
	const tickSize = context.axis.tickSize as number
	return context.topOrLeft ? context.thickness - tickSize : tickSize
}

function getTickCrossEnd(context: AxisContext) {
	return context.topOrLeft
		? context.thickness
		: (context.axis.tickWidth as number)
}

function createTickItem(tick: PositionedTickValue, context: AxisContext) {
	const {
		axis: { tickColor: stroke, tickWidth: strokeWidth },
	} = context

	const crossStart = getCrossStart(context)
	const crossEnd = getCrossEnd(context)
	const rangeStart = getRangeStart(tick, context)

	return {
		[context.rangeProperty]: rangeStart,
		[context.crossProperty]: crossStart,
		[context.crossEndProperty]: crossEnd,
		stroke,
		strokeWidth,
	}
}

function getRangeStart(tick: PositionedTickValue, context: AxisContext) {
	const strokeWidth = context.axis.tickWidth as number
	return tick.position + strokeWidth
}

function getCrossStart(context: AxisContext) {
	const tickSize = context.axis.tickSize as number
	const tickWidth = context.axis.tickWidth as number
	const result = context.topOrLeft ? context.thickness - tickSize : tickSize
	return result + tickWidth / 2
}

function getCrossEnd(context: AxisContext) {
	const tickWidth = context.axis.tickWidth as number
	return context.topOrLeft ? context.thickness : tickWidth
}
