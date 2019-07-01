/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { BandScale } from '../BandScale'
import { createScaleContext } from './util'

describe('The Band Scale', () => {
	it('can be created', () => {
		const scale = new BandScale()
			.name('test')
			.bandwidthName('testWidth')
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
			],
		})
		const built = scale.build(context)
		expect(built).toBeDefined()
		const { test, testWidth } = built
		expect(test).toBeDefined()
		expect(testWidth).toBeDefined()

		// Check the bandwidth
		expect(testWidth()).toEqual(10)

		// Check the band intervals
		for (let i = 0; i < 10; ++i) {
			expect(test(i)).toEqual(10 * i)
		}
	})

	it('can add padding to bands', () => {
		const scale = new BandScale()
			.name('test')
			.bandwidthName('testWidth')
			.domain('data.x')
			.padding(0.2)
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
		const { testWidth } = built
		expect(testWidth).toBeDefined()

		// Check the bandwidth
		expect(testWidth()).toBeGreaterThan(0)
		expect(testWidth()).toBeLessThan(10)
	})
})
