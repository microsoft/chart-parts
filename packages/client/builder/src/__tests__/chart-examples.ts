// tslint:disable no-implicit-dependencies
import { linear, band, ordinal, CategoricalColorScheme } from '@gog/scales'
import { Dimension, SceneNode, AxisOrientation } from '@gog/interfaces'
import { scene, rect, axis, group, text } from '../index'

describe('Building Charts', () => {
	it('can build a basic bar chart', () => {
		const builtScene = scene(
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
					)
					.mark(
						rect()
							.table('data')
							.encode({
								x: ({ datum }, { x }) => x(datum.category),
								y: ({ datum }, { y }) => y(datum.amount),
								y2: (d, { y }) => y(0),
								width: (d, { xband }) => xband(),
								fill: ({ index }) => 'steelblue',
							})
							.handle({
								onMouseEnter: () => {
									// Handle Enter
								},
								onMouseLeave: () => {
									// Handle Leave
								},
							}),
					),
			{ width: 400, height: 200 },
		).build()
		expect(builtScene).toMatchSnapshot()
	})

	it('can build a grouped bar chart', () => {
		const builtScene = scene(
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
		expect(builtScene).toMatchSnapshot()
	})
})
