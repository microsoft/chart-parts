/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as index from '../index'

describe('The quantitative scale index', () => {
	it('contains the discrete scales', () => {
		const scales = Object.keys(index)
		expect(scales.length).toEqual(7)
		expect(index.LinearScale).toBeDefined()
		expect(index.LogScale).toBeDefined()
		expect(index.PowScale).toBeDefined()
		expect(index.SequantialScale).toBeDefined()
		expect(index.SqrtScale).toBeDefined()
		expect(index.TimeScale).toBeDefined()
		expect(index.UtcScale).toBeDefined()
	})
})
