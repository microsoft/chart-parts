/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useMemo, useState, useCallback, memo } from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { scene, rect, axis } from '@chart-parts/builder'
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import { linear, band } from '@chart-parts/scales'
import { Orchestrator } from '@chart-parts/orchestrator'

const renderer = new Renderer()
const pipeline = new Orchestrator(renderer)

const data = [
	{ category: 'A', amount: 28 },
	{ category: 'B', amount: 55 },
	{ category: 'C', amount: 43 },
	{ category: 'D', amount: 91 },
	{ category: 'E', amount: 81 },
	{ category: 'F', amount: 53 },
	{ category: 'G', amount: 19 },
	{ category: 'H', amount: 87 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const BarChartBuilder: React.FC = memo(() => {
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
							band('x', 'xband')
								.domain('data.category')
								.range(Dimension.Width)
								.padding(0.05),
						)
						.axes(
							axis('x', AxisOrientation.Bottom),
							axis('y', AxisOrientation.Left),
							axis('x', AxisOrientation.Top),
							axis('y', AxisOrientation.Right),
						)
						.mark(
							rect()
								.table('data')
								.encode({
									x: ({ d, x }) => x(d.category),
									y: ({ d, y }) => y(d.amount),
									y2: ({ y }) => y(0),
									width: ({ xband }) => xband(),
									fill: ({ index }) =>
										isHovered(index) ? 'firebrick' : 'steelblue',
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
		[setHoverRowIndex, hoverRowIndex],
	)

	return pipeline.renderScene(
		chart,
		{ width: 400, height: 200, padding: 30 },
		{ data },
	)
})

BarChartBuilder.displayName = 'BarChartBuilder'
