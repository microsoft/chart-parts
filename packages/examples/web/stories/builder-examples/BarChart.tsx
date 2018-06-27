// tslint:disable
import * as React from 'react'
import { Renderer } from '@gog/react-svg-renderer'
import { scene, rect } from '@gog/scenegen'
import { Dimension, SceneNode } from '@gog/mark-spec-interfaces'
import { linear, band } from '@gog/scales'
import { VirtualSvgPipeline } from '@gog/core'

const renderer = new Renderer()
const pipeline = new VirtualSvgPipeline(renderer)

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

		this.chart = scene()
			.scale(
				linear('y')
					.table('data')
					.bindDomain('amount')
					.bindRange(Dimension.HEIGHT)
					.nice(),
				band('x', 'xband')
					.table('data')
					.bindDomain('category')
					.bindRange(Dimension.WIDTH)
					.padding(0.05),
			)
			.push(n =>
				n.mark(
					rect()
						.table('data')
						.encode({
							x: ({ datum }, { x }) => x(datum.category),
							y: ({ datum }, { y }) => y(datum.amount),
							y2: () => 200,
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
			)
			.build()
	}

	public render() {
		return pipeline.handleData(
			this.chart,
			{ width: 400, height: 200 },
			{ data },
		)
	}
}
