/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { PointScale } from '../PointScale'
import { createScaleContext } from '../../__tests__/util'

describe('The Point Scale', () => {
	it('can be created', () => {
		const scale = new PointScale()
			.name('test')
			.domain('data.x')
			.range([0, 100])
		const context = createScaleContext({
			data: [
				{ x: 0 },
				{ x: 1 },
				{ x: 2 },
				{ x: 3 },
				{ x: 4 },
				{ x: 5 },
				{ x: 6 },
				{ x: 7 },
				{ x: 8 },
				{ x: 9 },
				{ x: 10 },
			],
		})
		const built = scale.build(context)
		expect(built).toBeDefined()
		const { test } = built
		expect(test).toBeDefined()

		// Check the band intervals
		for (let i = 0; i <= 9; ++i) {
			expect(test(i)).toEqual(10 * i)
		}
	})

	it('can add padding to inter-point bands', () => {
		const scale = new PointScale()
			.name('test')
			.domain('data.x')
			.padding(0.5)
			.stepName('step')
			.range([0, 100])

		const context = createScaleContext({
			data: [
				{ x: 0 },
				{ x: 1 },
				{ x: 2 },
				{ x: 3 },
				{ x: 4 },
				{ x: 5 },
				{ x: 6 },
				{ x: 7 },
				{ x: 8 },
				{ x: 9 },
			],
		})
		const built = scale.build(context)
		expect(built).toBeDefined()
		const { test } = built
		expect(test).toBeDefined()

		expect(test(0)).toEqual(5)
		expect(test(1)).toEqual(15)
		expect(test(9)).toEqual(95)
	})

	it('can configure bin-alignment', () => {
		const scale = new PointScale()
			.name('test')
			.domain('data.x')
			//.align(0)
			.range([0, 100])
		const context = createScaleContext({
			data: [
				{ x: 0.5 },
				{ x: 1.5 },
				{ x: 2.5 },
				{ x: 3.5 },
				{ x: 4 },
				{ x: 5 },
				{ x: 6 },
				{ x: 7 },
				{ x: 8 },
				{ x: 9 },
				{ x: 10 },
			],
		})
		const built = scale.build(context)
		expect(built).toBeDefined()
		const { test } = built
		expect(test).toBeDefined()

		// Check the band intervals
		for (let i = 0; i <= 9; ++i) {
			expect(test(i)).toEqual(10 * i)
		}
	})
})
