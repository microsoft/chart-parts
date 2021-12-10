/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createScaleContext } from '../../__tests__/util'
import { LinearScale } from '../LinearScale'

describe('The Linear Scale', () => {
	it('can be created', () => {
		const result = new LinearScale()
			.name('test')
			.domain([0, 10])
			.range([0, 100])
		expect(result).toBeDefined()

		const built = result.build(
			createScaleContext({
				data: [{ x: 0 }, { x: 20 }],
			}),
		).test
		expect(built).toBeDefined()
		expect(built(0)).toBe(0)
		expect(built(5)).toBe(50)
		expect(built(10)).toBe(100)
	})
})
