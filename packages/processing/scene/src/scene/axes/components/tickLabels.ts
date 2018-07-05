import {
	MarkType,
	VerticalTextAlignment,
	HorizontalAlignment,
	AxisOrientation,
} from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { AxisContext, PositionedTickValue } from '../interfaces'

export function createTickLabels(context: AxisContext) {
	return buildMark(MarkType.Text)
		.role('axis-tick-labels')
		.items(...(context.ticks || []).map(tick => createTickLabel(tick, context)))
		.build()
}

function createTickLabel(tick: PositionedTickValue, context: AxisContext) {
	const { axis } = context
	const alignment = getLabelHorizontalAlignment(axis.orient)
	return {
		text: tick.label,
		[context.rangeStartProperty]: tick.position,
		[context.crossStartProperty]: context.tickSize,
		strokeWidth: 0,
		stroke: 'transparent',
		fill: '#777',
		font: axis.labelFont as string,
		fontSize: axis.labelFontSize as number,
		baseline: VerticalTextAlignment.MIDDLE,
		align: alignment,
	}
}

function getLabelHorizontalAlignment(orient: AxisOrientation) {
	switch (orient) {
		case AxisOrientation.Top:
		case AxisOrientation.Bottom:
			return HorizontalAlignment.CENTER
		case AxisOrientation.Left:
			return HorizontalAlignment.RIGHT
		case AxisOrientation.Right:
			return HorizontalAlignment.LEFT
	}
}
