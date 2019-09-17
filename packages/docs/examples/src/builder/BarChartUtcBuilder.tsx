/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useMemo, useState, useCallback } from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { scene, rect, area, axis } from '@chart-parts/builder'
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import { linear, time, band } from '@chart-parts/scales'
import { Orchestrator } from '@chart-parts/orchestrator'

const renderer = new Renderer()
const pipeline = new Orchestrator(renderer)

const data: any[] = []
for (let month = 1; month <= 12; ++month) {
	for (let day = 1; day <= 29; ++day) {
		const date = new Date(2017, month, day)
		const amount = Math.random() * 100
		data.push({ date, amount })
	}
}

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const BarChartUtcBuilder: React.FC = memo(() => {
	const [hoverRowIndex, setHoverRowIndex] = useState<number | undefined>()
	const isHovered = useCallback((index: number) => hoverRowIndex === index, [
		hoverRowIndex,
	])

	const chart = useMemo(
		() =>
			scene(
				n =>
					n
						.scale(
							linear('y')
								.domain('data.amount')
								.range(Dimension.Height)
								.nice(),
							time('x')
								.domain('data.date')
								.range(Dimension.Width)
								.nice(),
							band('xband', 'xbandwidth')
								.domain('data.date')
								.range(Dimension.Width),
						)
						.axes(
							axis('y', AxisOrientation.Left),
							axis('x', AxisOrientation.Bottom)
								.tickCount(4)
								.labelFormat('%b %m %d'),
						)
						.mark(
							area('dataline')
								.table('data')
								.encode({
									x: ({ d, xband }) => xband(d.date),
									y: ({ d, y }) => y(d.amount),
									y2: ({ y }) => y(0),
									stroke: () => 'black',
									strokeWidth: () => 0.5,
									fill: () => 'green',
								}),
							rect('highlight')
								.table('data')
								.encode({
									x: ({ d, xband }) => xband(d.date),
									y: ({ d, y }) => y(d.amount),
									y2: ({ y }) => y(0),
									width: ({ xbandwidth }) => xbandwidth(),
									fill: ({ index }) =>
										isHovered(index) ? 'firebrick' : 'transparent',
								})
								.handle({
									onMouseEnter: ({ index }) => {
										if (hoverRowIndex !== index) {
											setHoverRowIndex(index)
										}
									},
									onMouseLeave: ({ index }) => {
										if (hoverRowIndex === index) {
											setHoverRowIndex(undefined)
										}
									},
								}),
						),
				{ width: 400, height: 200 },
			).build(),
		[hoverRowIndex, setHoverRowIndex],
	)
	return pipeline.renderScene(
		chart,
		{ width: 400, height: 200, padding: 30 },
		{ data },
	)
})
BarChartUtcBuilder.displayName = 'BarChartUtcBuilder'
