/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/camelcase */
import React, { memo } from 'react'
import { VerticalTextAlignment } from '@chart-parts/interfaces'
import {
	Chart,
	Group,
	Circle,
	Line,
	LinearScale,
	BandScale,
	Dimension,
	Text,
} from '@chart-parts/react'

const series = [
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 0,
		y: 0.0302001953125,
	},
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 1,
		y: 0.002349853515625,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 2,
		y: 0.0008544921875,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 3,
		y: 0.000030517578125,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 4,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 5,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 6,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 7,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 8,
		y: 0,
	},
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 9,
		y: 0,
	},
]

const kpis = [
	{ label: 'docs', value: 609, fill: 'rgba(220,150,250,0.6)' },
	{ label: 'spread', value: '0.25', fill: 'rgba(220,150,250,0.6)' },
	{ label: 'max sse', value: '1.00', fill: 'rgba(220,150,250,0.6)' },
]

const SCALE_PAD = 5
const TEXT_GROUP_HEIGHT = 110

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const ElbowPlot: React.FC = memo(() => (
	<Chart height={200} width={200} data={{ kpis, series }}>
		<LinearScale
			name="x"
			domain="series.x"
			range={Dimension.Width}
			padding={SCALE_PAD}
		/>
		<LinearScale
			name="y"
			domain="series.y"
			range={Dimension.Height}
			padding={SCALE_PAD}
		/>
		<Group
			table="series"
			facet={{
				groupBy: '__series_id',
				name: 'facetedSeries',
			}}
		>
			<Line
				table="facetedSeries"
				x={({ d, x }) => x(d.x)}
				y={({ d, y }) => y(d.y)}
				stroke={({ d }) => d.line}
			/>
			<Circle
				table="facetedSeries"
				fill={({ d }) => d.fill}
				size={50}
				x={({ d, x }) => x(d.x)}
				y={({ d, y }) => y(d.y)}
			/>
			<Group x={140} y={60} width={50} height={TEXT_GROUP_HEIGHT}>
				<BandScale
					name="kpiLoc"
					domain="kpis.label"
					range={Dimension.Height}
					bandWidth="kpiHeight"
					align={0}
				/>
				<Group
					name="kpis"
					table="kpis"
					y={({ d, kpiLoc }) => kpiLoc(d.label)}
					height={({ kpiHeight }) => kpiHeight()}
				>
					<Text
						baseline={VerticalTextAlignment.Top}
						text={({ d }) => d.value}
						fill={'black'}
						fontSize={15}
					/>
					<Text
						baseline={VerticalTextAlignment.Top}
						y={15}
						text={({ d }) => d.label}
						fill={({ d }) => d.fill}
						fontSize={10}
					/>
				</Group>
			</Group>
		</Group>
	</Chart>
))
ElbowPlot.displayName = 'ElbowPlot'
