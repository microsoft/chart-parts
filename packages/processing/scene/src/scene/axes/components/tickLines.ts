import { MarkType } from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { AxisContext, PositionedTickValue } from '../interfaces'

const DEFAULT_TICK_COLOR = '#555'
const DEFAULT_TICK_WIDTH = 1

export function createTickLines(context: AxisContext) {
	return buildMark(MarkType.Rule)
		.role('axis-ticks')
		.items(...context.ticks.map(tick => createTickItem(tick, context)))
		.build()
}

function createTickItem(tick: PositionedTickValue, context: AxisContext) {
	const {
		axis: { tickColor: stroke = DEFAULT_TICK_COLOR },
		tickWidth: strokeWidth = DEFAULT_TICK_WIDTH,
	} = context

	const crossStart = getCrossStart(context)
	const crossEnd = getCrossEnd(context)
	const rangeStart = getRangeStart(tick, context)

	return {
		[context.rangeStartProperty]: rangeStart,
		[context.crossStartProperty]: crossStart,
		[context.crossEndProperty]: crossEnd,
		stroke,
		strokeWidth,
	}
}

function getRangeStart(tick: PositionedTickValue, context: AxisContext) {
	const { tickWidth: strokeWidth = DEFAULT_TICK_WIDTH } = context
	return tick.position + strokeWidth
}

function getCrossStart(context: AxisContext) {
	const result = context.topOrLeft
		? context.thickness - context.tickSize
		: context.tickSize

	return result + (context.tickWidth || DEFAULT_TICK_WIDTH / 2)
}

function getCrossEnd(context: AxisContext) {
	return context.topOrLeft ? context.thickness : DEFAULT_TICK_WIDTH
}
