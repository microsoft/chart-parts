/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dimension, AxisOrientation } from '@chart-parts/interfaces'
import { linear } from '@chart-parts/scales'
import { SceneBuilder } from '../SceneBuilder'
import { rect, axis } from '../index'

describe('The scene node builder', () => {
	it('can be constructed', () => {
		expect(new SceneBuilder()).toBeDefined()
	})

	it('can add marks', () => {
		const rectMark = rect()
		const scene = new SceneBuilder().mark(rectMark)
		expect(scene.build().marks.length).toBe(1)
	})

	it('can remove marks', () => {
		const rectMark = rect()
		const scene = new SceneBuilder().mark(rectMark).removeMark(rectMark)
		expect(scene.build().marks.length).toBe(0)
	})

	it('can set scales', () => {
		const scene = new SceneBuilder().scale(
			linear('x')
				.domain('data.amount')
				.range(Dimension.Height),
		)
		expect(scene.build().scales.length).toBe(1)
	})

	it('can remove scales', () => {
		const scale = linear('x')
			.domain('data.amount')
			.range(Dimension.Height)
		const scene = new SceneBuilder().scale(scale).removeScale(scale)
		expect(scene.build().scales.length).toBe(0)
	})

	it('can set axes', () => {
		const scene = new SceneBuilder()
			.scale(
				linear('x')
					.domain('data.amount')
					.range(Dimension.Height),
			)
			.axes(axis('x', AxisOrientation.Left))

		expect(scene.build().axes.length).toBe(1)
	})

	it('can remove axes', () => {
		const a = axis('x', AxisOrientation.Left)
		const scene = new SceneBuilder()
			.scale(
				linear('x')
					.domain('data.amount')
					.range(Dimension.Height),
			)
			.axes(a)
			.removeAxis(a)

		expect(scene.build().axes.length).toBe(0)
	})
})
