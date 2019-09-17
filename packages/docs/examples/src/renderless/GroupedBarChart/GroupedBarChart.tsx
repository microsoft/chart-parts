/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import {
	Chart,
	LinearScale,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
	Group,
	Rect,
	Text,
} from '@chart-parts/react'
import {
	VerticalTextAlignment,
	HorizontalAlignment,
} from '@chart-parts/interfaces'

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
const dataset = { data }

/**
 * Adapted from https://vega.github.io/vega/examples/grouped-bar-chart/q
 */
export const GroupedBarChart: React.FC = memo(() => (
	<Chart width={300} height={240} padding={5} data={dataset}>
		<BandScale
			name="y"
			bandWidth="categoryHeight"
			range={Dimension.Height}
			domain="data.category"
			padding={0.2}
		/>
		<LinearScale
			name="x"
			range={Dimension.Width}
			domain="data.value"
			nice
			zero
		/>
		<OrdinalScale
			name="color"
			domain="data.position"
			colorScheme={CategoricalColorScheme.category20}
		/>
		<Group
			name="chartgroup"
			table="data"
			facet={{ groupBy: 'category', name: 'facet' }}
			y={({ d, y }) => y(d.category)}
			height={({ categoryHeight }) => categoryHeight()}
		>
			<BandScale
				name="pos"
				bandWidth="rowHeight"
				range={Dimension.Height}
				domain="facet.position"
			/>
			<Rect
				name="bars"
				table="facet"
				x={({ d, x }) => x(d.value)}
				y={({ d, pos }) => pos(d.position)}
				x2={({ x }) => x(0)}
				fill={({ d, color }) => color(d.position)}
				height={({ rowHeight }) => rowHeight()}
			/>
			<Text
				table="facet"
				x={({ d, x }) => x(d.value) - 3}
				y={({ d, pos, rowHeight }) => pos(d.position) + rowHeight() * 0.5}
				fill={'white'}
				align={HorizontalAlignment.Right}
				baseline={VerticalTextAlignment.Middle}
				text={({ d }) => d.value}
			/>
		</Group>
	</Chart>
))
GroupedBarChart.displayName = 'GroupedBarChart'
