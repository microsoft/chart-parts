import React, { useState } from 'react'
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

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export const BarChart: React.FC = () => {
	const [hoverRowIndex, setHoverRowIndex] = useState<number | undefined>()

	return (
		<Chart width={400} height={200} renderer={renderer} data={{ data }}>
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
				onMouseEnter={({ index }) => {
					if (hoverRowIndex !== index) {
						setHoverRowIndex(index)
					}
				}}
				onMouseLeave={({ index }) => {
					if (hoverRowIndex === index) {
						setHoverRowIndex(undefined)
					}
				}}
				x={({ d, x }) => x(d.category)}
				y={({ d, y }) => y(d.amount)}
				width={({ band }) => band()}
				y2={({ y }) => y(0)}
				fill={({ index }) =>
					hoverRowIndex === index ? 'firebrick' : 'steelblue'
				}
			/>
			{hoverRowIndex === undefined ? null : (
				<Text
					text={({ data }) => data[hoverRowIndex].amount}
					fill="black"
					x={({ data, x, band }) =>
						x(data[hoverRowIndex].category) + band() / 2
					}
					y={({ data, y }) => y(data[hoverRowIndex].amount) - 3}
					baseline={VerticalTextAlignment.Bottom}
					align={HorizontalAlignment.Center}
				/>
			)}
		</Chart>
	)
}
