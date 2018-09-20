// tslint:disable
import * as React from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { scene, rect, area, axis } from '@chart-parts/builder'
import { Dimension, SceneNode, AxisOrientation } from '@chart-parts/interfaces'
import { linear, time, band } from '@chart-parts/scales'
import { Orchestrator } from '@chart-parts/orchestrator'

const renderer = new Renderer()
const pipeline = new Orchestrator(renderer)

const data: any[] = []
for (let month = 1; month <= 12; ++month) {
	for (let day = 1; day <= 29; ++day) {
		const date = new Date(2017, month, day)
		const amount = Math.random() * 100
		data.push({ date, amount })
	}
}

export interface BarChartState {
	hoverRowIndex: number | undefined
}

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export class BarChartUtc extends React.Component<{}, BarChartState> {
	private chart: SceneNode

	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
		const isHovered = (index: number) => this.state.hoverRowIndex === index

		this.chart = scene(
			n =>
				n
					.scale(
						linear('y')
							.domain('data.amount')
							.range(Dimension.Height)
							.nice(),
						time('x')
							.domain('data.date')
							.range(Dimension.Width)
							.nice(),
						band('xband', 'xbandwidth')
							.domain('data.date')
							.range(Dimension.Width),
					)
					.axes(
						axis('y', AxisOrientation.Left),
						axis('x', AxisOrientation.Bottom)
							.tickCount(4)
							.labelFormat('%b %m %d'),
					)
					.mark(
						area('dataline')
							.table('data')
							.encode({
								x: ({ d, xband }) => xband(d.date),
								y: ({ d, y }) => y(d.amount),
								y2: ({ y }) => y(0),
								stroke: () => 'black',
								strokeWidth: () => 0.5,
								fill: () => 'green',
							}),
						rect('highlight')
							.table('data')
							.encode({
								x: ({ d, xband }) => xband(d.date),
								y: ({ d, y }) => y(d.amount),
								y2: ({ y }) => y(0),
								width: ({ xbandwidth }) => xbandwidth(),
								fill: ({ index }) =>
									isHovered(index) ? 'firebrick' : 'transparent',
							})
							.handle({
								onMouseEnter: ({ index }) => {
									if (this.state.hoverRowIndex !== index) {
										this.setState({ hoverRowIndex: index })
									}
								},
								onMouseLeave: ({ index }) => {
									if (this.state.hoverRowIndex === index) {
										this.setState({ hoverRowIndex: undefined })
									}
								},
							}),
					),
			{ width: 400, height: 200 },
		).build()
	}

	public render() {
		return pipeline.renderScene(
			this.chart,
			{ width: 400, height: 200, padding: 30 },
			{ data },
		)
	}
}
