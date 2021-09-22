/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import {
	Axis,
	LinearScale,
	Group,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { useMemo, memo } from 'react'
import { useDataGroupSorted, useGroupByFaceting } from '../hooks'
import { CommonChartProps, AxisProps, FillMarkProps } from '../types'
import { createChartContainer } from '../util'
import { LineMarks } from './LineMarks'

export interface LineChartProps extends CommonChartProps, FillMarkProps {
	groupBy: string
	xAxisProps?: AxisProps
	yAxisProps?: AxisProps
}

const Container = createChartContainer('Line Chart')

export const LineChart: React.FC<LineChartProps> = memo(function LineChart({
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
			data={useLineChartData(data, groupBy)}
			title={title}
			description={description}
			padding={chartPadding}
		>
			<LinearScale
				name="x"
				domain="data.key"
				range={Dimension.Width}
				padding={0.5}
			/>
			<LinearScale
				name="y"
				domain="data.value"
				range={Dimension.Height}
				nice
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
			<Group table="data" facet={useGroupByFaceting(groupBy)}>
				<LineMarks {...props} />
				{children}
			</Group>
		</Container>
	)
})

function useLineChartData(data: any[], groupBy: string) {
	const sortedData = useDataGroupSorted(groupBy, data)
	return useMemo(() => ({ data: sortedData }), [sortedData])
}
