// tslint:disable
import * as React from 'react'
import { Renderer } from '@gog/react-svg-renderer'
import { SceneNode, Dimension } from '@gog/interfaces'
import { scene, rect, group, text } from '@gog/builder'
import { band, linear, ordinal, CategoricalColorScheme } from '@gog/scales'
import { VirtualSvgPipeline } from '@gog/core'

const renderer = new Renderer()
const pipeline = new VirtualSvgPipeline(renderer)

const data = [
	{ category: 'A', position: 0, value: 0.1 },
	{ category: 'A', position: 1, value: 0.6 },
	{ category: 'A', position: 2, value: 0.9 },
	{ category: 'A', position: 3, value: 0.4 },
	{ category: 'B', position: 0, value: 0.7 },
	{ category: 'B', position: 1, value: 0.2 },
	{ category: 'B', position: 2, value: 1.1 },
	{ category: 'B', position: 3, value: 0.8 },
	{ category: 'C', position: 0, value: 0.6 },
	{ category: 'C', position: 1, value: 0.1 },
	{ category: 'C', position: 2, value: 0.2 },
	{ category: 'C', position: 3, value: 0.7 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/grouped-bar-chart/q
 */
export class GroupedBarChart extends React.Component<{}> {
	private chart: SceneNode

	constructor(props: {}) {
		super(props)

		this.chart = scene(
			n =>
				n
					.scale(
						band('y', 'categoryHeight')
							.table('data')
							.range(Dimension.Height)
							.domain('category')
							.padding(0.2),
						linear('x')
							.table('data')
							.domain('value')
							.range(Dimension.Width)
							.nice(true)
							.zero(true),
						ordinal('color')
							.table('data')
							.domain('position')
							.colorScheme(CategoricalColorScheme.category20),
					)
					.mark(
						group('chartgroup')
							.table('data')
							.facet({
								name: 'facet',
								partitionOn: (r: any) => r.category,
							})
							.encode({
								y: ({ datum }, { y }) => y(datum[0].category),
								height: (d, { categoryHeight }) => categoryHeight(),
							})
							.child(node =>
								node
									.scale(
										band('pos', 'rowHeight')
											.table('facet')
											.domain('position')
											.range(Dimension.Height),
									)
									.mark(
										rect('bars')
											.table('facet')
											.encode({
												x: ({ datum }, { x }) => x(datum.value),
												y: ({ datum }, { pos }) => pos(datum.position),
												x2: (d, { x }) => x(0),
												fill: ({ datum }, { color }) => color(datum.position),
												height: (d, { rowHeight }) => rowHeight(),
											}),
										text()
											.table('facet')
											.encode({
												x: ({ datum }, { x }) => x(datum.value) - 3,
												y: ({ datum }, { pos, rowHeight }) =>
													pos(datum.position) + rowHeight() * 0.5,
												fill: () => 'white',
												align: () => 'right',
												baseline: () => 'middle',
												text: ({ datum }) => datum.value,
											}),
									),
							),
					),
			{ width: 400, height: 200 },
		).build()
	}

	public render() {
		return pipeline.handleData(
			this.chart,
			{ width: 400, height: 200 },
			{ data },
		)
	}
}
