// tslint:disable
import * as React from 'react'
import { Renderer } from '@markable/react-svg-renderer'
import { scene, rect, axis } from '@markable/builder'
import { Dimension, SceneNode, AxisOrientation } from '@markable/interfaces'
import { linear, band } from '@markable/scales'
import { Orchestrator } from '@markable/orchestrator'

const renderer = new Renderer()
const pipeline = new Orchestrator(renderer)

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
							.table('data')
							.domain('amount')
							.range(Dimension.Height)
							.nice(),
						band('x', 'xband')
							.table('data')
							.domain('category')
							.range(Dimension.Width)
							.padding(0.05),
					)
					.axes(
						axis('x', AxisOrientation.Bottom),
						axis('y', AxisOrientation.Left),
						axis('x', AxisOrientation.Top),
						axis('y', AxisOrientation.Right),
					)
					.mark(
						rect()
							.table('data')
							.encode({
								x: ({ d }, { x }) => x(d.category),
								y: ({ d }, { y }) => y(d.amount),
								y2: (d, { y }) => y(0),
								width: (d, { xband }) => xband(),
								fill: ({ index }) =>
									isHovered(index) ? 'firebrick' : 'steelblue',
							})
							.handle({
								onMouseEnter: (evt, { index }) => {
									if (this.state.hoverRowIndex !== index) {
										this.setState({ hoverRowIndex: index })
									}
								},
								onMouseLeave: (evt, { index }) => {
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
