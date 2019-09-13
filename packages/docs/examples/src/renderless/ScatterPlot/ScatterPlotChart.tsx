import React, { memo, useMemo, useCallback } from 'react'
import { dataset as newDataset, filter } from '@chart-parts/transform'
import { Chart, LinearScale, Axis, Circle } from '@chart-parts/react'
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
// @ts-ignore
import movies from 'vega-datasets/data/movies.json'

export interface ScatterPlotChartProps {
	xField: string
	yField: string
}

/**
 * Based off of https://vega.github.io/vega/examples/scatter-plot-null-values/
 */
export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = memo(
	({ xField, yField }) => {
		const dataset = useDataset(xField, yField)

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
					x={useCallback(({ d, x }) => x(d[xField]), [xField])}
					y={useCallback(({ d, y }) => y(d[yField]), [yField])}
				/>
			</Chart>
		)
	},
)

function useDataset(xField: string, yField: string) {
	return useMemo(() => {
		return newDataset()
			.addTable('movies', movies)
			.addDerivedTable(
				'valid',
				'movies',
				filter((d: any) => d[xField] != null && d[yField] != null),
			).tables
	}, [xField, yField])
}
