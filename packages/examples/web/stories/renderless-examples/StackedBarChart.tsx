// tslint:disable
import * as React from 'react'
import {
	Chart,
	Rect,
	LinearScale,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
import { StackTransform } from '@gog/data-transform'

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
const stackedData = new StackTransform()
	.groupBy((r: any) => r.x)
	.field((r: any) => r.y)
	.sort({ field: (r: any) => r.c })
	.transform(data)

export interface StackedBarChartState {
	hoverRowIndex?: number
}

/**
 * Adapted from https://vega.github.io/vega/examples/stacked-bar-chart/
 */
export class StackedBarChart extends React.Component<{}, StackedBarChartState> {
	constructor(props: {}) {
		super(props)
		this.state = {}
	}
	public render() {
		return (
			<Chart
				width={500}
				height={200}
				data={{ data: stackedData }}
				renderer={renderer}
			>
				<BandScale
					name="x"
					table="data"
					bandWidth="width"
					bindRange={Dimension.WIDTH}
					bindDomain="x"
				/>
				<LinearScale
					name="y"
					table="data"
					bindRange={Dimension.HEIGHT}
					bindDomain="y1"
					nice={true}
					zero={true}
				/>
				<OrdinalScale
					name="color"
					table="data"
					bindDomain="c"
					colorScheme={CategoricalColorScheme.category10}
				/>
				<Rect
					onMouseEnter={(evt, { index }) => {
						if (this.state.hoverRowIndex !== index) {
							this.setState({ hoverRowIndex: index })
						}
					}}
					onMouseLeave={(evt, { index }) => {
						if (this.state.hoverRowIndex === index) {
							this.setState({ hoverRowIndex: undefined })
						}
					}}
					table="data"
					x={({ datum }, { x }) => x(datum.x)}
					width={(d, { width }) => width() - 1}
					y={({ datum }, { y }) => y(datum.y0)}
					y2={({ datum }, { y }) => y(datum.y1)}
					fill={({ datum }, { color }) => color(datum.c)}
					fillOpacity={({ index }) =>
						this.state.hoverRowIndex === index ? 0.5 : 1
					}
				/>
			</Chart>
		)
	}
}
