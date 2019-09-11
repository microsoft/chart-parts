import React from 'react'
import {
	Chart,
	Rect,
	LinearScale,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
} from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { dataset, stack } from '@chart-parts/transform'

const renderer = new Renderer()
const data = [
	{ x: 0, y: 28, c: 0 },
	{ x: 0, y: 55, c: 1 },
	{ x: 1, y: 43, c: 0 },
	{ x: 1, y: 91, c: 1 },
	{ x: 2, y: 81, c: 0 },
	{ x: 2, y: 53, c: 1 },
	{ x: 3, y: 19, c: 0 },
	{ x: 3, y: 87, c: 1 },
	{ x: 4, y: 52, c: 0 },
	{ x: 4, y: 48, c: 1 },
	{ x: 5, y: 24, c: 0 },
	{ x: 5, y: 49, c: 1 },
	{ x: 6, y: 87, c: 0 },
	{ x: 6, y: 66, c: 1 },
	{ x: 7, y: 17, c: 0 },
	{ x: 7, y: 27, c: 1 },
	{ x: 8, y: 68, c: 0 },
	{ x: 8, y: 16, c: 1 },
	{ x: 9, y: 49, c: 0 },
	{ x: 9, y: 15, c: 1 },
]

const ds = dataset().addTable(
	'data',
	data,
	stack('y')
		.groupBy('x')
		.sort({ field: 'c' }),
)
export interface StackedBarChartState {
	hoverRowIndex?: number
}

/**
 * Adapted from https://vega.github.io/vega/examples/stacked-bar-chart/
 */
export class StackedBarChart extends React.Component<{}, StackedBarChartState> {
	public state: StackedBarChartState = {}

	public render() {
		return (
			<Chart
				width={500}
				height={200}
				data={{ data: ds.getTable('data') as any[] }}
				renderer={renderer}
			>
				<BandScale
					name="x"
					bandWidth="width"
					range={Dimension.Width}
					domain="data.x"
				/>
				<LinearScale
					name="y"
					range={Dimension.Height}
					domain="data.y1"
					nice
					zero
				/>
				<OrdinalScale
					name="color"
					domain="data.c"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<Rect
					onMouseEnter={({ index }) => {
						if (this.state.hoverRowIndex !== index) {
							this.setState({ hoverRowIndex: index })
						}
					}}
					onMouseLeave={({ index }) => {
						if (this.state.hoverRowIndex === index) {
							this.setState({ hoverRowIndex: undefined })
						}
					}}
					table="data"
					x={({ d, x }) => x(d.x)}
					width={({ width }) => width() - 1}
					y={({ d, y }) => y(d.y0)}
					y2={({ d, y }) => y(d.y1)}
					fill={({ d, color }) => color(d.c)}
					fillOpacity={({ index }) =>
						this.state.hoverRowIndex === index ? 0.5 : 1
					}
				/>
			</Chart>
		)
	}
}
