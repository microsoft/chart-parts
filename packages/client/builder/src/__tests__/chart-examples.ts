// tslint:disable no-implicit-dependencies
import { linear, band, ordinal, CategoricalColorScheme } from '@markable/scales'
import {
	Dimension,
	SceneNode,
	AxisOrientation,
	HorizontalAlignment,
	VerticalAlignment,
	VerticalTextAlignment,
} from '@markable/interfaces'
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
								x: ({ d }, { x }) => x(d.category),
								y: ({ d }, { y }) => y(d.amount),
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
								y: ({ d }, { y }) => y(d[0].category),
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
												x: ({ d }, { x }) => x(d.value),
												y: ({ d }, { pos }) => pos(d.position),
												x2: (d, { x }) => x(0),
												fill: ({ d }, { color }) => color(d.position),
												height: (d, { rowHeight }) => rowHeight(),
											}),
										text()
											.table('facet')
											.encode({
												x: ({ d }, { x }) => x(d.value) - 3,
												y: ({ d }, { pos, rowHeight }) =>
													pos(d.position) + rowHeight() * 0.5,
												fill: () => 'white',
												align: () => HorizontalAlignment.Right,
												baseline: () => VerticalTextAlignment.Middle,
												text: ({ d }) => d.value,
											}),
									),
							),
					),
			{ width: 400, height: 200 },
		).build()
		expect(builtScene).toMatchSnapshot()
	})
})
