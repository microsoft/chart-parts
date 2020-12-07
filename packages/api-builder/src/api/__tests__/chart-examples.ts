/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	linear,
	band,
	ordinal,
	CategoricalColorScheme,
} from '@chart-parts/scales'
import {
	Dimension,
	AxisOrientation,
	HorizontalAlignment,
	VerticalTextAlignment,
} from '@chart-parts/interfaces'
import { scene, rect, axis, group, text } from '../index'

describe('Building Charts', () => {
	it('can build a basic bar chart', () => {
		const builtScene = scene(
			n =>
				n
					.scale(
						linear('y')
							.domain('data.amount')
							.range(Dimension.Height)
							.nice(),
						band('x', 'xband')
							.domain('data.category')
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
								x: ({ d, x }) => x(d.category),
								y: ({ d, y }) => y(d.amount),
								y2: ({ y }) => y(0),
								width: ({ xband }) => xband(),
								fill: 'steelblue',
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
							.range(Dimension.Height)
							.domain('data.category')
							.padding(0.2),
						linear('x')
							.domain('data.value')
							.range(Dimension.Width)
							.nice()
							.zero(),
						ordinal('color')
							.domain('data.position')
							.colorScheme(CategoricalColorScheme.category20),
					)
					.mark(
						group('chartgroup')
							.table('data')
							.facet({
								name: 'facet',
								groupBy: 'category',
							})
							.encode({
								y: ({ d, y }) => y(d[0].category),
								height: ({ categoryHeight }) => categoryHeight(),
							})
							.child(node =>
								node
									.scale(
										band('pos', 'rowHeight')
											.domain('facet.position')
											.range(Dimension.Height),
									)
									.mark(
										rect('bars')
											.table('facet')
											.encode({
												x: ({ d, x }) => x(d.value),
												y: ({ d, pos }) => pos(d.position),
												x2: ({ x }) => x(0),
												fill: ({ d, color }) => color(d.position),
												height: ({ rowHeight }) => rowHeight(),
											}),
										text()
											.table('facet')
											.encode({
												x: ({ d, x }) => x(d.value) - 3,
												y: ({ d, pos, rowHeight }) =>
													pos(d.position) + rowHeight() * 0.5,
												fill: 'white',
												align: HorizontalAlignment.Right,
												baseline: VerticalTextAlignment.Middle,
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
