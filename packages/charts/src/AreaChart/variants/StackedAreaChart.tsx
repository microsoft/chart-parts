/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import {
	Axis,
	Group,
	LinearScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { stack, dataset } from '@chart-parts/transform'
import React, { memo, useMemo } from 'react'
import { useDataGroupSorted, useGroupByFaceting } from '../../hooks'
import { createChartContainer } from '../../util'
import { StackedAreaMarks } from '../marks/StackedAreaMarks'
import { AreaChartProps } from '../types'

const Container = createChartContainer('Stacked Area Chart')

export const StackedAreaChart: React.FC<AreaChartProps> = memo(
	function StackedAreaChart({
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
				data={useStackedAreaChartData(groupBy, data)}
				title={title}
				description={description}
				padding={chartPadding}
			>
				<LinearScale name="x" domain="data.key" range={Dimension.Width} />
				<LinearScale
					name="y"
					domain="data.y1"
					range={Dimension.Height}
					nice
					zero
				/>
				<Axis
					orient={AxisOrientation.Bottom}
					scale="x"
					labelPadding={10}
					tickSize={10}
					{...xAxisProps}
				/>
				<OrdinalScale
					name="color"
					domain="data._category"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<Axis orient={AxisOrientation.Left} scale="y" {...yAxisProps} />
				<Group table="data" facet={useGroupByFaceting(groupBy)}>
					<StackedAreaMarks {...props} />
					{children}
				</Group>
			</Container>
		)
	},
)

function useStackedAreaChartData(groupBy: string | undefined, data: any[]) {
	const dataSorted = useDataGroupSorted(groupBy, data)
	const dataMapping = useMemo(() => {
		let mapped = data
		if (dataSorted) {
			const ds = dataset().addTable(
				'data',
				dataSorted,
				stack('value').groupBy('key').sort({ field: '_category' }),
			)
			mapped = ds.getTable('data')
		}

		return mapped
	}, [data, dataSorted])
	return useMemo(() => ({ data: dataMapping }), [dataMapping])
}
