/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation, MarkEncoding } from '@chart-parts/interfaces'
import {
	LinearScale,
	BandScale,
	Dimension,
	Axis,
	Group,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { FC, useMemo, memo, useCallback } from 'react'
import {
	useGroupData,
	useChartOrientation,
	useGroupByFaceting,
} from '../../hooks'
import { Orientation, AxisProps, BandScaleProps } from '../../types'
import { createChartContainer } from '../../util'
import { GroupedBarMarks } from '../marks/GroupedBarMarks'
import { BarChartProps } from '../types'

const Container = createChartContainer('Grouped Bar Chart')

export const GroupedBarChart: FC<BarChartProps> = memo(
	function GroupedBarChart({
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
		const dataMapping = useGroupData(groupBy, data)
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
				<ScalesAndAxes
					xAxisProps={xAxisProps}
					yAxisProps={yAxisProps}
					bandScaleProps={bandScaleProps}
					orientation={orientationKey}
				/>
				<OrdinalScale
					name="color"
					domain="data._position"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<GroupedComponent orientation={orientationKey} groupBy={groupBy}>
					<GroupedBarMarks {...props} />
					{children}
				</GroupedComponent>
			</Container>
		)
	},
)

interface GroupedComponentProps {
	groupBy?: string
	orientation?: Orientation
}
const GroupedComponent: FC<GroupedComponentProps> = memo(
	function GroupedComponent({ orientation, groupBy, children }) {
		const faceting = useGroupByFaceting(groupBy)
		const encodeSpan: MarkEncoding<number> = useCallback(
			({ categoryHeight }: any) => categoryHeight(),
			[],
		)
		const encodePos = useCallback(
			({ d, category, categoryHeight }: any) =>
				category(d.category) + categoryHeight(),
			[],
		)
		if (orientation === Orientation.vertical) {
			return (
				<>
					<Group
						name="chartgroup"
						table="data"
						facet={faceting}
						width={encodeSpan}
						x2={encodePos}
					>
						<BandScale
							name="localX"
							bandWidth="rowWidth"
							range={Dimension.Width}
							domain="facet._position"
						/>
						{children}
					</Group>
				</>
			)
		}
		return (
			<>
				<Group
					name="chartgroup"
					table="data"
					facet={faceting}
					height={encodeSpan}
					y2={encodePos}
				>
					<BandScale
						name="localY"
						bandWidth="rowHeight"
						range={Dimension.Height}
						domain="facet._position"
					/>
					{children}
				</Group>
			</>
		)
	},
)

interface ScalesAndAxesProps {
	orientation: Orientation
	xAxisProps?: AxisProps
	yAxisProps?: AxisProps
	bandScaleProps?: BandScaleProps
}

const ScalesAndAxes: FC<ScalesAndAxesProps> = memo(function ScalesAndAxes({
	orientation,
	xAxisProps,
	yAxisProps,
	bandScaleProps,
}) {
	const isVertical = useMemo(
		() => orientation === Orientation.vertical,
		[orientation],
	)
	const bandScaleName = useMemo(() => (isVertical ? 'x' : 'y'), [isVertical])
	const bandScaleDimension = useMemo(
		() => (isVertical ? Dimension.Width : Dimension.Height),
		[isVertical],
	)
	const linearScaleName = useMemo(() => (isVertical ? 'y' : 'x'), [isVertical])
	const linearScaleDimension = useMemo(
		() => (isVertical ? Dimension.Height : Dimension.Width),
		[isVertical],
	)
	const bottomAxisScale = useMemo(
		() => (isVertical ? 'category' : 'x'),
		[isVertical],
	)
	const leftAxisScale = useMemo(
		() => (isVertical ? 'y' : 'category'),
		[isVertical],
	)

	return (
		<>
			<BandScale
				name={bandScaleName}
				bandWidth="band"
				domain="data.key"
				padding={0.1}
				range={Dimension.Height} // TODO: correct?
				{...bandScaleProps}
			/>
			<LinearScale
				name={linearScaleName}
				range={linearScaleDimension}
				domain="data.value"
				nice
				zero
			/>
			<BandScale
				name="category"
				bandWidth="categoryHeight"
				range={bandScaleDimension}
				domain="data._category"
				padding={0.2}
			/>
			<Axis
				orient={AxisOrientation.Bottom}
				scale={bottomAxisScale}
				labelPadding={8}
				{...xAxisProps}
			/>
			<Axis
				orient={AxisOrientation.Left}
				scale={leftAxisScale}
				{...yAxisProps}
			/>
		</>
	)
})
