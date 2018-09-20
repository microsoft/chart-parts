// tslint:disable no-implicit-dependencies
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import { linear } from '@chart-parts/scales'
import { SceneNodeBuilder } from '../SceneNodeBuilder'
import { rect, axis } from '../index'

describe('The scene node builder', () => {
	it('can be constructed', () => {
		expect(new SceneNodeBuilder()).toBeDefined()
	})

	it('can set scales', () => {
		const scene = new SceneNodeBuilder().mark(rect()).scale(
			linear('x')
				.domain('data.amount')
				.range(Dimension.Height),
		)
		expect(scene.build().scales.length).toBe(1)
	})

	it('can set axes', () => {
		const scene = new SceneNodeBuilder()
			.mark(rect())
			.scale(
				linear('x')
					.domain('data.amount')
					.range(Dimension.Height),
			)
			.axes(axis('x', AxisOrientation.Left))

		expect(scene.build().axes.length).toBe(1)
	})
})
