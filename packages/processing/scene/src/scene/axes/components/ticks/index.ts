import { Axis, MarkType, AxisOrientation } from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { AxisContext, PositionedTickValue } from '../../interfaces'
import { getTickValues } from './getTickValues'

const DEFAULT_TICK_COLOR = '#555'
const DEFAULT_TICK_WIDTH = 0.5
const DEFAULT_TICK_SIZE = 5

const tickSize = (axis: Axis) => axis.tickSize || DEFAULT_TICK_SIZE

export function createTicks(context: AxisContext) {
	const ticks = getTickValues(context)
	const crossStart = getCrossStart(context)
	const crossEnd = getCrossEnd(context)

	// Populate the ticks for other component creators
	context.ticks = ticks
	context.tickSize = tickSize(context.axis)
	context.tickWidth = context.axis.tickWidth || DEFAULT_TICK_WIDTH

	return buildMark(MarkType.Rule)
		.role('axis-ticks')
		.items(
			...ticks.map(tick => createTickItem(tick, context, crossStart, crossEnd)),
		)
		.build()
}

function createTickItem(
	tick: PositionedTickValue,
	context: AxisContext,
	crossStart: number,
	crossEnd: number,
) {
	const {
		axis: { tickColor: stroke = DEFAULT_TICK_COLOR },
		tickWidth: strokeWidth = DEFAULT_TICK_WIDTH,
	} = context
	return {
		[context.rangeStartProperty]: tick.position + strokeWidth,
		[context.crossStartProperty]: crossStart + DEFAULT_TICK_WIDTH / 2,
		[context.crossEndProperty]:
			crossEnd + (context.topOrLeft ? strokeWidth : 0),
		stroke,
		strokeWidth,
	}
}

function getCrossStart(context: AxisContext) {
	return context.topOrLeft
		? context.thickness - tickSize(context.axis)
		: tickSize(context.axis)
}

function getCrossEnd(context: AxisContext) {
	return context.topOrLeft
		? context.thickness - (context.tickWidth || DEFAULT_TICK_WIDTH)
		: DEFAULT_TICK_WIDTH
}
