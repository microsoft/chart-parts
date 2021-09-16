/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FontWeight, ChannelHandler } from '@chart-parts/interfaces'
import { ChartPadding } from '@chart-parts/react'
import { object } from '@storybook/addon-knobs'
import { useState, useCallback } from 'react'
import { AxisProps, BandScaleProps } from '../../src'

export function makeAxisProps(name: string) {
	return object<AxisProps>(name, {
		thickness: 1,
		domainWidth: 1,
		domainColor: 'black',
		ticks: true,
		tickColor: 'black',
		tickCount: undefined,
		tickOffset: 0,
		tickRound: false,
		tickSize: 5,
		bandPosition: 0,
		labels: true,
		labelFont: 'Libre Baskerville',
		labelFontSize: 10,
		labelColor: 'black',
		labelPadding: 8,
		labelFontWeight: '400' as FontWeight,
		labelAngle: 0,
		labelFormat: '',
	})
}

export function makeChartPadding() {
	return object<ChartPadding>('chart padding', {
		top: 20,
		bottom: 20,
		left: 25,
		right: 20,
	})
}

export function makeBandScaleProps() {
	return object<BandScaleProps>('bandscale props', {
		padding: 0.1,
		paddingInner: 0,
		paddingOuter: 0,
		align: 0,
		round: false,
	})
}

export function useHoverIndex(): [
	number | undefined,
	// Mouse Enter Handler
	ChannelHandler<any>,
	// Mouse Leave Hnadler
	ChannelHandler<any>,
] {
	const [hoverRowIndex, setHoverRowIndex] = useState<number | undefined>(
		undefined,
	)
	const onMouseEnter = useCallback(
		ctx => {
			if (hoverRowIndex !== ctx.index) {
				setHoverRowIndex(ctx.index)
			}
		},
		[hoverRowIndex],
	)
	const onMouseLeave = useCallback(
		() => setHoverRowIndex(undefined),
		[setHoverRowIndex],
	)

	return [hoverRowIndex, onMouseEnter, onMouseLeave]
}
