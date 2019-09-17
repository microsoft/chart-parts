/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import { Area, Axis, Chart, LinearScale, Dimension } from '@chart-parts/react'
import { AxisOrientation, Interpolation } from '@chart-parts/interfaces'

const data = [
	{ u: 1, v: 28 },
	{ u: 2, v: 55 },
	{ u: 3, v: 43 },
	{ u: 4, v: 91 },
	{ u: 5, v: 81 },
	{ u: 6, v: 53 },
	{ u: 7, v: 19 },
	{ u: 8, v: 87 },
	{ u: 9, v: 52 },
	{ u: 10, v: 48 },
	{ u: 11, v: 24 },
	{ u: 12, v: 49 },
	{ u: 13, v: 87 },
	{ u: 14, v: 66 },
	{ u: 15, v: 17 },
	{ u: 16, v: 27 },
	{ u: 17, v: 68 },
	{ u: 18, v: 16 },
	{ u: 19, v: 49 },
	{ u: 20, v: 15 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const AreaChart: React.FC = memo(() => (
	<Chart width={500} height={200} padding={8} data={{ data }}>
		<LinearScale
			name="x"
			domain="data.u"
			range={Dimension.Width}
			zero={false}
		/>
		<LinearScale name="y" domain="data.v" range={Dimension.Height} nice zero />

		<Axis orient={AxisOrientation.Bottom} scale="x" tickCount={20} />
		<Axis orient={AxisOrientation.Left} scale="y" />

		<Area
			table="data"
			x={({ d, x }: any) => x(d.u)}
			y={({ d, y }: any) => y(d.v)}
			y2={({ y }: any) => y(0)}
			fill="steelblue"
			interpolate={Interpolation.Monotone}
		/>
	</Chart>
))
AreaChart.displayName = 'AreaChart'
