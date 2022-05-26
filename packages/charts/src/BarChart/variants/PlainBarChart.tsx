/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import { LinearScale, BandScale, Dimension, Axis } from '@chart-parts/react'
import { FC, useMemo, memo } from 'react'
import { useChartOrientation, useBarData } from '../../hooks'
import { Orientation, BandScaleProps } from '../../types'
import { createChartContainer } from '../../util'
import { BarMarks } from '../marks/BarMarks'
import { BarChartProps } from '../types'

const Container = createChartContainer('Bar Chart')

export const PlainBarChart: FC<BarChartProps> = memo(function PlainBarChart({
	data,
	height,
	width,
	orientation,
	title,
	description,
	chartPadding,
	children,
	bandScaleProps,
	xAxisProps,
	yAxisProps,
	...props
}) {
	const orientationKey = useChartOrientation(orientation)
	const dataMapping = useBarData(data, orientationKey)
	const dataset = useMemo(() => ({ data: dataMapping }), [dataMapping])
	return (
		<Container
			width={width}
			height={height}
			data={dataset}
			title={title}
			description={description}
			padding={chartPadding}
		>
			<BarChartScales
				orientation={orientationKey}
				bandScaleProps={bandScaleProps}
			/>
			<Axis
				orient={AxisOrientation.Bottom}
				scale="x"
				labelPadding={8}
				{...xAxisProps}
			/>
			<Axis orient={AxisOrientation.Left} scale="y" {...yAxisProps} />
			<BarMarks {...props} />
			{children}
		</Container>
	)
})

interface BarChartScalesProps {
	orientation?: Orientation
	bandScaleProps?: BandScaleProps
}
const BarChartScales: FC<BarChartScalesProps> = memo(function BarChartScales({
	orientation,
	bandScaleProps,
}) {
	const isVertical = useMemo(
		() => orientation === Orientation.vertical,
		[orientation],
	)
	const bandScaleName = useMemo(() => (isVertical ? 'x' : 'y'), [isVertical])
	const bandScaleRange = useMemo(
		() => (isVertical ? Dimension.Width : Dimension.Height),
		[isVertical],
	)
	const linearScaleName = useMemo(() => (isVertical ? 'y' : 'x'), [isVertical])
	const linearScaleRange = useMemo(
		() => (isVertical ? Dimension.Height : Dimension.Width),
		[isVertical],
	)

	return (
		<>
			<BandScale
				domain="data.key"
				bandWidth="band"
				name={bandScaleName}
				range={bandScaleRange}
				padding={0.1}
				{...bandScaleProps}
			/>
			<LinearScale
				domain="data.value"
				name={linearScaleName}
				range={linearScaleRange}
				nice
				zero
			/>
		</>
	)
})
