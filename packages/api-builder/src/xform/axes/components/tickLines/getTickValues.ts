/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Axis, Scale } from '@chart-parts/interfaces'
import { AxisContext, PositionedTickValue } from '../../interfaces'

/**
 * Gets logical tick values and their associated labels
 * @ignore
 * @param context The axis context
 */
export function getTickValues(context: AxisContext): PositionedTickValue[] {
	const { axis, scale } = context

	if (axis.values != null) {
		return axis.values.map(av => ({ ...av, position: scale(av.value) }))
	}

	// Try to get the ticks from the `tick` utility built into d3 scales
	return scale.ticks
		? getTicksFromScaleTicks(context)
		: scale.domain
		? getTicksFromScaleDomain(context, scale)
		: []
}

function getDomainScaleValue(t: any, scale: Scale<any, any>, axis: Axis) {
	const tickRound = axis.tickRound
	const bandPosition = axis.bandPosition as number
	const result = scale.bandwidth
		? scale(t) + scale.bandwidth() * bandPosition
		: t
	return tickRound ? Math.round(result) : result
}

function getTicksFromScaleTicks(context: AxisContext) {
	const { axis, scale } = context
	const tickWidth = axis.tickWidth as number

	if (!scale.ticks) {
		throw new Error('cannot extract scale domain')
	}
	const ticks =
		axis.tickCount != null ? scale.ticks(axis.tickCount) : scale.ticks()

	return ticks.map((t: number) => {
		const position = scale(t)
		const label = context.labelFormatter(t)
		return {
			value: t,
			position: axis.tickRound
				? Math.round(position)
				: position - tickWidth / 2,
			label,
		}
	})
}

function getTicksFromScaleDomain(context: AxisContext, scale: Scale<any, any>) {
	const { axis } = context
	if (!scale.domain) {
		throw new Error('cannot extract scale domain')
	}
	const domain = scale.domain()
	return domain.map((t: any) => {
		const label = context.labelFormatter(t)
		return {
			value: t,
			position: getDomainScaleValue(t, scale, axis),
			label,
		}
	})
}
