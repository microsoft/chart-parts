/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useState, useCallback } from 'react'
import {
	Axis,
	Chart,
	Rect,
	LinearScale,
	BandScale,
	Dimension,
	Text,
} from '@chart-parts/react'
import {
	AxisOrientation,
	VerticalTextAlignment,
	HorizontalAlignment,
} from '@chart-parts/interfaces'

const data = [
	{ category: 'A', amount: 28 },
	{ category: 'B', amount: 55 },
	{ category: 'C', amount: 43 },
	{ category: 'D', amount: 91 },
	{ category: 'E', amount: 81 },
	{ category: 'F', amount: 53 },
	{ category: 'G', amount: 19 },
	{ category: 'H', amount: 87 },
]

const dataset = { data }

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const BarChart: React.FC = memo(() => {
	const [hoverIndex, setHoverIndex] = useState<number | undefined>()
	const onEnterRect = useCallback(
		({ index }) => {
			if (hoverIndex !== index) {
				setHoverIndex(index)
			}
		},
		[hoverIndex, setHoverIndex],
	)
	const onLeaveRect = useCallback(
		({ index }) => {
			if (hoverIndex === index) {
				setHoverIndex(undefined)
			}
		},
		[hoverIndex, setHoverIndex],
	)
	const encodeX = useCallback(({ d, x }) => x(d.category), [])
	const encodeY = useCallback(({ d, y }) => y(d.amount), [])
	const encodeWidth = useCallback(({ band }) => band(), [])
	const encodeFill = useCallback(
		({ index }) => (hoverIndex === index ? 'firebrick' : 'steelblue'),
		[hoverIndex],
	)
	const encodeTitle = useCallback(({ d }) => `Category ${d.category}`, [])
	const encodeDescription = useCallback(
		({ d }) => `Category ${d.category} value is ${d.amount}`,
		[],
	)
	return (
		<Chart
			width={400}
			height={200}
			data={dataset}
			title="Bar Chart"
			description="An example bar chart"
		>
			<Scales />
			<Axes />
			<Rect
				table="data"
				onMouseEnter={onEnterRect}
				onMouseLeave={onLeaveRect}
				ariaTitle={encodeTitle}
				ariaDescription={encodeDescription}
				tabIndex={1}
				x={encodeX}
				y={encodeY}
				width={encodeWidth}
				y2={0}
				fill={encodeFill}
			/>
			{hoverIndex === undefined ? null : (
				<HoverTextHighlight index={hoverIndex} />
			)}
		</Chart>
	)
})
BarChart.displayName = 'BarChart'

const Scales: React.FC = memo(() => (
	<>
		<LinearScale
			name="y"
			domain="data.amount"
			range={Dimension.Height}
			nice
			zero
		/>
		<BandScale
			name="x"
			bandWidth="band"
			domain="data.category"
			padding={0.05}
			range={Dimension.Width}
		/>
	</>
))
Scales.displayName = 'Scales'

const Axes: React.FC = memo(() => (
	<>
		<Axis orient={AxisOrientation.Bottom} scale="x" />
		<Axis orient={AxisOrientation.Left} scale="y" />
	</>
))
Axes.displayName = 'Axes'

interface HoverTextHighlightProps {
	index: number
}
const HoverTextHighlight: React.FC<HoverTextHighlightProps> = memo(
	({ index }) => (
		<Text
			text={useCallback(({ data }) => data[index].amount, [index])}
			fill="black"
			x={useCallback(
				({ data, x, band }) => x(data[index].category) + band() / 2,
				[index],
			)}
			y={useCallback(({ data, y }) => y(data[index].amount) - 3, [index])}
			baseline={VerticalTextAlignment.Bottom}
			align={HorizontalAlignment.Center}
		/>
	),
)
HoverTextHighlight.displayName = 'HoverTextHighlight'
