// tslint:disable
import * as React from 'react'
import { Chart } from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
import { scene, mark } from '@gog/scenegen'
import { MarkType } from '@gog/core'
import { Dimension, SceneNode } from '@gog/mark-spec-interfaces'
import { linear, band } from '@gog/scales'

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
	private chart: SceneNode

	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
		const isHovered = (index: number) => this.state.hoverRowIndex === index

		this.chart = scene()
			.scale(
				linear()
					.name('y')
					.table('data')
					.bindDomain('amount')
					.bindRange(Dimension.HEIGHT)
					.nice(),
			)
			.scale(
				band()
					.name('x')
					.table('data')
					.bandwidth('xband')
					.bindDomain('category')
					.bindRange(Dimension.WIDTH)
					.padding(0.05),
			)
			.mark(
				mark(MarkType.Rect)
					.table('data')
					.encode('x', ({ datum }, { x }) => x(datum.category))
					.encode('y', ({ datum }, { y }) => y(datum.amount))
					.encode('y2', () => 200)
					.encode('width', (d, { xband }) => xband())
					.encode(
						'fill',
						({ index }) => (isHovered(index) ? 'firebrick' : 'steelblue'),
					)
					.channel('onMouseEnter', ({ metadata: { index } }: any) => {
						if (isHovered(index)) {
							this.setState({ hoverRowIndex: index })
						}
					})
					.channel('onMouseLeave', ({ metadata: { index } }: any) => {
						if (isHovered(index)) {
							this.setState({ hoverRowIndex: undefined })
						}
					}),
			)
			.build()

		console.log('chart', this.chart)
	}

	public render() {
		return (
			<Chart width={400} height={200} renderer={renderer} data={{ data }} />
		)
	}
}
