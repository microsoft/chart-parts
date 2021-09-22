/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import {
	LinearScale,
	Axis,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { stack, dataset } from '@chart-parts/transform'
import { FC, useMemo, memo } from 'react'
import { useGroupData, useChartOrientation } from '../../hooks'
import { Orientation, BandScaleProps, AxisProps } from '../../types'
import { createChartContainer } from '../../util'
import { StackedBarMarks } from '../marks/StackedBarMarks'
import { BarChartProps } from '../types'

const Container = createChartContainer('Stacked Bar Chart')

export const StackedBarChart: FC<BarChartProps> = memo(
	function StackedBarChart({
		data,
		height,
		width,
		orientation,
		title,
		chartPadding,
		description,
		children,
		groupBy,
		bandScaleProps,
		xAxisProps,
		yAxisProps,
		...props
	}) {
		const orientationKey = useChartOrientation(orientation)
		return (
			<Container
				width={width}
				height={height}
				data={useChartData(groupBy, orientation, data)}
				title={title}
				description={description}
				padding={chartPadding}
			>
				<ScalesAndAxis
					orientation={orientationKey}
					xAxisProps={xAxisProps}
					yAxisProps={yAxisProps}
				/>
				<OrdinalScale
					name="color"
					domain="data._position"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<StackedBarMarks {...props} />
				{children}
			</Container>
		)
	},
)

function useChartData(
	groupBy: string | undefined,
	orientation: Orientation | undefined,
	data: any[],
) {
	const dataGrouped = useGroupData(groupBy, data)
	const dataMapping = useMemo(() => {
		const ds = dataset().addTable(
			'data',
			dataGrouped,
			stack('value')
				.groupBy(groupBy || 'key')
				.sort({ field: 'value' }),
		)
		const mapped = ds.getTable('data')
		return mapped
	}, [dataGrouped, groupBy])
	return useMemo(() => ({ data: dataMapping }), [dataMapping])
}

interface ScalesAndAxisProps {
	orientation: Orientation
	bandScaleProps?: BandScaleProps
	xAxisProps?: AxisProps
	yAxisProps?: AxisProps
}

const ScalesAndAxis: FC<ScalesAndAxisProps> = memo(function ScalesAndAxis({
	orientation,
	bandScaleProps,
	xAxisProps,
	yAxisProps,
}) {
	if (orientation === Orientation.vertical) {
		return (
			<>
				<BandScale
					name="xVertical"
					bandWidth="band"
					range={Dimension.Width}
					domain="data._category"
					{...bandScaleProps}
				/>
				<LinearScale
					name="yVertical"
					range={Dimension.Height}
					domain="data.y1"
					nice
					zero
				/>
				<Axis
					orient={AxisOrientation.Bottom}
					scale="xVertical"
					labelPadding={8}
					{...xAxisProps}
				/>
				<Axis orient={AxisOrientation.Left} scale="yVertical" />
			</>
		)
	}
	return (
		<>
			<BandScale
				name="yHorizontal"
				bandWidth="band"
				range={Dimension.Height}
				domain="data._category"
				{...bandScaleProps}
			/>
			<LinearScale
				name="xHorizontal"
				range={Dimension.Width}
				domain="data.y1"
				nice
				zero
			/>
			<Axis
				orient={AxisOrientation.Bottom}
				scale="xHorizontal"
				labelPadding={8}
				{...xAxisProps}
			/>
			<Axis orient={AxisOrientation.Left} scale="yHorizontal" {...yAxisProps} />
		</>
	)
})
