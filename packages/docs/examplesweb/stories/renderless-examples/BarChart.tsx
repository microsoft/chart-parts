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
import { Renderer } from '@chart-parts/react-svg-renderer'

const renderer = new Renderer()

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

export interface BarChartState {
	hoverRowIndex: number | undefined
}

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
	return (
		<Chart width={400} height={200} renderer={renderer} data={dataset}>
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
			<Axis orient={AxisOrientation.Bottom} scale="x" />
			<Axis orient={AxisOrientation.Left} scale="y" />
			<Rect
				table="data"
				onMouseEnter={onEnterRect}
				onMouseLeave={onLeaveRect}
				x={useCallback(({ d, x }) => x(d.category), [])}
				y={useCallback(({ d, y }) => y(d.amount), [])}
				width={useCallback(({ band }) => band(), [])}
				y2={useCallback(({ y }) => y(0), [])}
				fill={useCallback(
					({ index }) => (hoverIndex === index ? 'firebrick' : 'steelblue'),
					[hoverIndex],
				)}
			/>
			{hoverIndex === undefined ? null : (
				<HoverTextHighlight index={hoverIndex} />
			)}
		</Chart>
	)
})
BarChart.displayName = 'BarChart'

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
