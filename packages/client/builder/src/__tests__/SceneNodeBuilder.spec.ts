// tslint:disable no-implicit-dependencies
import { Dimension, AxisOrientation } from '@markable/interfaces'
import { linear } from '@markable/scales'
import { SceneNodeBuilder } from '../SceneNodeBuilder'
import { rect, axis } from '../index'

describe('The scene node builder', () => {
	it('can be constructed', () => {
		expect(new SceneNodeBuilder()).toBeDefined()
	})

	it('can set scales', () => {
		const scene = new SceneNodeBuilder().mark(rect()).scale(
			linear('x')
				.table('data')
				.domain('amount')
				.range(Dimension.Height),
		)
		expect(scene.build().scales.length).toBe(1)
	})

	it('can set axes', () => {
		const scene = new SceneNodeBuilder()
			.mark(rect())
			.scale(
				linear('x')
					.table('data')
					.domain('amount')
					.range(Dimension.Height),
			)
			.axes(axis('x', AxisOrientation.Left))

		expect(scene.build().axes.length).toBe(1)
	})
})
