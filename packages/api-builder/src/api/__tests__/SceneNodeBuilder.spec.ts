/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import { linear } from '@chart-parts/scales'
import { SceneNodeBuilder } from '../SceneNodeBuilder'
import { rect, axis } from '../factories'

describe('The scene node builder', () => {
	it('can be constructed', () => {
		expect(new SceneNodeBuilder()).toBeDefined()
	})

	it('can add marks', () => {
		const rectMark = rect()
		const scene = new SceneNodeBuilder().mark(rectMark)
		expect(scene.build().marks).toHaveLength(1)
	})

	it('can remove marks', () => {
		const rectMark = rect()
		const scene = new SceneNodeBuilder().mark(rectMark).removeMark(rectMark)
		expect(scene.build().marks).toHaveLength(0)
	})

	it('can set scales', () => {
		const scene = new SceneNodeBuilder().scale(
			linear('x').domain('data.amount').range(Dimension.Height),
		)
		expect(scene.build().scales).toHaveLength(1)
	})

	it('can remove scales', () => {
		const scale = linear('x').domain('data.amount').range(Dimension.Height)
		const scene = new SceneNodeBuilder().scale(scale).removeScale(scale)
		expect(scene.build().scales).toHaveLength(0)
	})

	it('can set axes', () => {
		const scene = new SceneNodeBuilder()
			.scale(linear('x').domain('data.amount').range(Dimension.Height))
			.axes(axis('x', AxisOrientation.Left))

		expect(scene.build().axes).toHaveLength(1)
	})

	it('can remove axes', () => {
		const a = axis('x', AxisOrientation.Left)
		const scene = new SceneNodeBuilder()
			.scale(linear('x').domain('data.amount').range(Dimension.Height))
			.axes(a)
			.removeAxis(a)

		expect(scene.build().axes).toHaveLength(0)
	})
})
