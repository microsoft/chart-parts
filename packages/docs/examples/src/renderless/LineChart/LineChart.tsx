/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import {
	Axis,
	Chart,
	Line,
	LinearScale,
	PointScale,
	Group,
	OrdinalScale,
	Dimension,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { AxisOrientation } from '@chart-parts/interfaces'

const data = [
	{ x: 0, y: 28, c: 0 },
	{ x: 0, y: 20, c: 1 },
	{ x: 1, y: 43, c: 0 },
	{ x: 1, y: 35, c: 1 },
	{ x: 2, y: 81, c: 0 },
	{ x: 2, y: 10, c: 1 },
	{ x: 3, y: 19, c: 0 },
	{ x: 3, y: 15, c: 1 },
	{ x: 4, y: 52, c: 0 },
	{ x: 4, y: 48, c: 1 },
	{ x: 5, y: 24, c: 0 },
	{ x: 5, y: 28, c: 1 },
	{ x: 6, y: 87, c: 0 },
	{ x: 6, y: 66, c: 1 },
	{ x: 7, y: 17, c: 0 },
	{ x: 7, y: 27, c: 1 },
	{ x: 8, y: 68, c: 0 },
	{ x: 8, y: 16, c: 1 },
	{ x: 9, y: 49, c: 0 },
	{ x: 9, y: 25, c: 1 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const LineChart: React.FC = memo(() => (
	<Chart width={500} height={200} padding={5} data={{ data }}>
		<PointScale
			name="x"
			stepName="xStep"
			domain="data.x"
			range={Dimension.Width}
		/>
		<LinearScale name="y" domain="data.y" range={Dimension.Height} nice zero />
		<OrdinalScale
			name="color"
			domain="data.c"
			colorScheme={CategoricalColorScheme.category10}
		/>
		<Axis orient={AxisOrientation.Bottom} scale="x" />
		<Axis orient={AxisOrientation.Left} scale="y" />

		<Group table="data" facet={{ groupBy: 'c', name: 'facetedData' }}>
			<Line
				table="facetedData"
				x={({ d, x }) => x(d.x)}
				y={({ d, y }) => y(d.y)}
				stroke={({ d, color }) => color(d.c)}
				strokeWidth={2}
			/>
		</Group>
	</Chart>
))
LineChart.displayName = 'LineChart'
