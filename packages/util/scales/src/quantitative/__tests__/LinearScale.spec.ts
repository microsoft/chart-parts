/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { LinearScale } from '../LinearScale'
import { createScaleContext } from '../../__tests__/util'

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
		expect(built(0)).toEqual(0)
		expect(built(5)).toEqual(50)
		expect(built(10)).toEqual(100)
	})
})
