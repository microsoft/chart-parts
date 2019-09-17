/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import {
	Area,
	Axis,
	Chart,
	Group,
	LinearScale,
	PointScale,
	OrdinalScale,
	Dimension,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { AxisOrientation, Interpolation } from '@chart-parts/interfaces'
import { stack, dataset } from '@chart-parts/transform'

const data = [
	{ x: 0, y: 28, c: 0 },
	{ x: 0, y: 55, c: 1 },
	{ x: 1, y: 43, c: 0 },
	{ x: 1, y: 91, c: 1 },
	{ x: 2, y: 81, c: 0 },
	{ x: 2, y: 53, c: 1 },
	{ x: 3, y: 19, c: 0 },
	{ x: 3, y: 87, c: 1 },
	{ x: 4, y: 52, c: 0 },
	{ x: 4, y: 48, c: 1 },
	{ x: 5, y: 24, c: 0 },
	{ x: 5, y: 49, c: 1 },
	{ x: 6, y: 87, c: 0 },
	{ x: 6, y: 66, c: 1 },
	{ x: 7, y: 17, c: 0 },
	{ x: 7, y: 27, c: 1 },
	{ x: 8, y: 68, c: 0 },
	{ x: 8, y: 16, c: 1 },
	{ x: 9, y: 49, c: 0 },
	{ x: 9, y: 15, c: 1 },
]

const ds = dataset().addTable(
	'data',
	data,
	stack('y')
		.groupBy('x')
		.sort({ field: 'c' }),
)

export const StackedAreaChart: React.FC = memo(() => (
	<Chart width={500} height={200} padding={8} data={ds.tables}>
		<PointScale name="x" domain="data.x" range={Dimension.Width} />
		<LinearScale name="y" domain="data.y1" range={Dimension.Height} nice zero />
		<OrdinalScale
			name="color"
			domain="data.c"
			colorScheme={CategoricalColorScheme.category10}
		/>

		<Axis orient={AxisOrientation.Bottom} scale="x" />
		<Axis orient={AxisOrientation.Left} scale="y" />

		<Group table="data" facet={{ groupBy: 'c', name: 'faceted' }}>
			<Area
				table="faceted"
				x={({ d, x }) => x(d.x)}
				y={({ d, y }) => y(d.y0)}
				y2={({ d, y }) => y(d.y1)}
				fill={({ d, color }) => color(d.c)}
				interpolate={Interpolation.Monotone}
			/>
		</Group>
	</Chart>
))
StackedAreaChart.displayName = 'StackedAreaChart'
