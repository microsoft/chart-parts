/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import parse from '../parse'

describe('the parse utility', () => {
	it('can parse a custom shape', () => {
		const result = parse('M 230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z')
		expect(result).toEqual([
			['M', 230, 80],
			['A', 45, 45, 0, 0, 0, 1, 0],
			['A', 0, 0, 275, 125],
			['L', 275, 80],
			['Z', 0],
		])
	})
})
