// tslint:disable
import * as React from 'react'
import { Chart, Rect, LinearScale, BandScale, Dimension } from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
import { ChannelHandler } from '@gog/mark-spec-interfaces'

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
export class BarChart extends React.Component<{}, BarChartState> {
	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
	}

	public render() {
		return (
			<Chart width={400} height={200} renderer={renderer} data={{ data }}>
				<LinearScale
					name="y"
					table="data"
					bindDomain="amount"
					bindRange={Dimension.HEIGHT}
					nice={true}
				/>
				<BandScale
					table="data"
					name="x"
					bandWidth="band"
					bindDomain="category"
					padding={0.05}
					bindRange={Dimension.WIDTH}
				/>
				{/* <Axis orient="bottom" scale="x" />
				<Axis orient="left" scale="y" /> */}
				<Rect
					table="data"
					eventHandlers={
						{
							onMouseEnter: (evt: any, { index }) => {
								if (this.state.hoverRowIndex !== index) {
									this.setState({ hoverRowIndex: index })
								}
							},
							onMouseLeave: (evt: any, { index }) => {
								if (this.state.hoverRowIndex === index) {
									this.setState({ hoverRowIndex: undefined })
								}
							},
						} as { [key: string]: ChannelHandler }
					}
					x={({ datum }, { x }) => x(datum.category)}
					y={({ datum }, { y }) => y(datum.amount)}
					width={(d, { band }) => band()}
					y2={200}
					fill={({ index }) =>
						this.state.hoverRowIndex === index ? 'firebrick' : 'steelblue'
					}
				/>
			</Chart>
		)
	}
}
