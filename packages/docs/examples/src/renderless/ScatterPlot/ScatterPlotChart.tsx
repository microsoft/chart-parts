/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useMemo, useCallback } from 'react'
import { dataset as newDataset, filter } from '@chart-parts/transform'
import { Chart, LinearScale, Axis, Circle, Text } from '@chart-parts/react'
import {
	Dimension,
	AxisOrientation,
	VerticalTextAlignment,
	HorizontalAlignment,
} from '@chart-parts/interfaces'
// @ts-ignore
import movies from 'vega-datasets/data/movies.json'

export interface ScatterPlotChartProps {
	xField: string
	yField: string
}

const NULL_SIZE = 8
// const NULL_GAP = NULL_SIZE + 10

/**
 * Based off of https://vega.github.io/vega/examples/scatter-plot-null-values/
 */
export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = memo(
	({ xField, yField }) => {
		const dataset = useDataset(xField, yField)

		const encodeX = useCallback(({ d, x }) => x(d[xField]), [xField])
		const encodeY = useCallback(({ d, y }) => y(d[yField]), [yField])

		return (
			<Chart width={450} height={450} padding={5} data={dataset}>
				<LinearScale
					name="x"
					nice={true}
					domain={`valid.${xField}`}
					range={Dimension.Width}
				/>
				<LinearScale
					name="y"
					nice={true}
					domain={`valid.${yField}`}
					range={Dimension.Height}
				/>
				<Axis orient={AxisOrientation.Bottom} scale="x" tickOffset={5} />
				<Axis orient={AxisOrientation.Left} scale="y" tickOffset={5} />
				<Circle
					size={50}
					table="valid"
					fill="steelblue"
					fillOpacity={0.5}
					zIndex={0}
					x={encodeX}
					y={encodeY}
				/>
				<Circle
					size={50}
					table="nullY"
					fill="#aaa"
					fillOpacity={0.2}
					zIndex={0}
					x={encodeX}
					y={ctx => ctx.view.height - NULL_SIZE / 2}
				/>
				<Circle
					size={50}
					table="nullX"
					fill="#aaa"
					fillOpacity={0.2}
					zIndex={0}
					x={NULL_SIZE / 2}
					y={encodeY}
				/>
				<Text
					x={NULL_SIZE - 4}
					y={ctx => ctx.view.height - 13}
					text={({ nullXY }) => `${nullXY.length} null`}
					align={HorizontalAlignment.Left}
					baseline={VerticalTextAlignment.Top}
					fill="#999"
					fontSize={9}
				/>
			</Chart>
		)
	},
)
ScatterPlotChart.displayName = 'ScatterPlotChart'

function useDataset(xField: string, yField: string) {
	return useMemo(() => {
		return newDataset()
			.addTable('movies', movies)
			.addDerivedTable(
				'valid',
				'movies',
				filter((d: any) => d[xField] != null && d[yField] != null),
			)
			.addDerivedTable(
				'nullXY',
				'movies',
				filter((d: any) => d[xField] === null && d[yField] === null),
			)
			.addDerivedTable(
				'nullX',
				'movies',
				filter((d: any) => d[xField] === null && d[yField] != null),
			)
			.addDerivedTable(
				'nullY',
				'movies',
				filter((d: any) => d[xField] != null && d[yField] === null),
			).tables
	}, [xField, yField])
}
