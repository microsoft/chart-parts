/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import {
	LinearScale,
	Axis,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import React, { memo, useMemo } from 'react'
import { LineChartProps } from '../LineChart/LineChart'
import { useDataGroupSorted } from '../hooks'
import { createChartContainer } from '../util'
import { CircleMarks, CircleMarksProps } from './CircleMarks'

const Container = createChartContainer('Scatterplot')

export interface ScatterPlotProps extends LineChartProps, CircleMarksProps {}

export const ScatterPlot: React.FC<ScatterPlotProps> = memo(
	function ScatterPlot({
		data,
		height,
		width,
		title,
		chartPadding,
		description,
		children,
		groupBy,
		xAxisProps,
		yAxisProps,
		...props
	}) {
		return (
			<Container
				width={width}
				height={height}
				data={useChartData(data, groupBy)}
				title={title}
				description={description}
				padding={chartPadding}
			>
				<LinearScale
					name="x"
					nice={true}
					domain="data.key"
					range={Dimension.Width}
					padding={0.5}
				/>
				<LinearScale
					name="y"
					nice={true}
					domain="data.value"
					range={Dimension.Height}
					zero
				/>
				<OrdinalScale
					name="color"
					domain="data._category"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<Axis
					orient={AxisOrientation.Bottom}
					scale="x"
					labelPadding={8}
					{...xAxisProps}
				/>
				<Axis orient={AxisOrientation.Left} scale="y" {...yAxisProps} />
				<CircleMarks {...props} />
				{children}
			</Container>
		)
	},
)

function useChartData(data: any[], groupBy: string) {
	const sortedData = useDataGroupSorted(groupBy, data)
	return useMemo(() => ({ data: sortedData }), [sortedData])
}
