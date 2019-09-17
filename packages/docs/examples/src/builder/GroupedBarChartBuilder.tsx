/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useMemo } from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import {
	Dimension,
	HorizontalAlignment,
	VerticalTextAlignment,
} from '@chart-parts/interfaces'
import { scene, rect, group, text } from '@chart-parts/builder'
import {
	band,
	linear,
	ordinal,
	CategoricalColorScheme,
} from '@chart-parts/scales'
import { Orchestrator } from '@chart-parts/orchestrator'

const renderer = new Renderer()
const pipeline = new Orchestrator(renderer)

const data = [
	{ category: 'A', position: 0, value: 0.1 },
	{ category: 'A', position: 1, value: 0.6 },
	{ category: 'A', position: 2, value: 0.9 },
	{ category: 'A', position: 3, value: 0.4 },
	{ category: 'B', position: 0, value: 0.7 },
	{ category: 'B', position: 1, value: 0.2 },
	{ category: 'B', position: 2, value: 1.1 },
	{ category: 'B', position: 3, value: 0.8 },
	{ category: 'C', position: 0, value: 0.6 },
	{ category: 'C', position: 1, value: 0.1 },
	{ category: 'C', position: 2, value: 0.2 },
	{ category: 'C', position: 3, value: 0.7 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/grouped-bar-chart/q
 */
export const GroupedBarChartBuilder: React.FC = memo(() => {
	const chart = useMemo(
		() =>
			scene(
				n =>
					n
						.scale(
							band('y', 'categoryHeight')
								.range(Dimension.Height)
								.domain('data.category')
								.padding(0.2),
							linear('x')
								.domain('data.value')
								.range(Dimension.Width)
								.nice()
								.zero(),
							ordinal('color')
								.domain('data.position')
								.colorScheme(CategoricalColorScheme.category20),
						)
						.mark(
							group('chartgroup')
								.table('data')
								.facet({
									name: 'facet',
									table: 'data',
									groupBy: 'category',
								})
								.encode({
									y: ({ d, y }) => y(d.category),
									height: ({ categoryHeight }) => categoryHeight(),
								})
								.child(node =>
									node
										.scale(
											band('pos', 'rowHeight')
												.domain('facet.position')
												.range(Dimension.Height),
										)
										.mark(
											rect('bars')
												.table('facet')
												.encode({
													x: ({ d, x }) => x(d.value),
													y: ({ d, pos }) => pos(d.position),
													x2: ({ x }) => x(0),
													fill: ({ d, color }) => color(d.position),
													height: ({ rowHeight }) => rowHeight(),
												}),
											text()
												.table('facet')
												.encode({
													x: ({ d, x }) => x(d.value) - 3,
													y: ({ d, pos, rowHeight }) =>
														pos(d.position) + rowHeight() * 0.5,
													fill: () => 'white',
													align: () => HorizontalAlignment.Right,
													baseline: () => VerticalTextAlignment.Middle,
													text: ({ d }) => d.value,
												}),
										),
								),
						),
				{ width: 400, height: 200 },
			).build(),
		[],
	)
	return pipeline.renderScene(chart, { width: 400, height: 200 }, { data })
})
GroupedBarChartBuilder.displayName = 'GroupedBarChartBuilder'
