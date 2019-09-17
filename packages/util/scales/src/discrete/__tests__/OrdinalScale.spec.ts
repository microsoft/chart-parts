/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { OrdinalScale } from '../OrdinalScale'
import { CategoricalColorScheme } from '../../colorSchemeMap'
import { createScaleContext } from './util'

describe('The Ordinal Scale', () => {
	it('exists', () => {
		expect(OrdinalScale).toBeDefined()
		const scale = new OrdinalScale()
		expect(scale).toBeDefined()
	})

	it('can build out an ordinal scale with color output', () => {
		const scale = new OrdinalScale()
			.name('color')
			.domain('data.c')
			.colorScheme(CategoricalColorScheme.category10)

		const ctx = createScaleContext({
			data: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }],
		})
		const built = scale.build(ctx)['color']
		expect(typeof built(1)).toEqual('string')
		expect(typeof built(2)).toEqual('string')
		expect(typeof built(3)).toEqual('string')
		expect(built).toBeDefined()
	})

	it('can build out an ordinal scale with numeric output', () => {
		const scale = new OrdinalScale()
			.name('scale')
			.domain('data.c')
			.range([2, 4, 6, 8])

		const ctx = createScaleContext({
			data: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }],
		})
		const built = scale.build(ctx)['scale']
		expect(built).toBeDefined()
		expect(built(1)).toEqual(2)
		expect(built(2)).toEqual(4)
		expect(built(3)).toEqual(6)
		expect(built(4)).toEqual(8)
	})

	it('throws if the range output is not defined', () => {
		const scale = new OrdinalScale().name('scale').domain('data.c')

		const ctx = createScaleContext({
			data: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }],
		})
		expect(() => scale.build(ctx)['scale']).toThrow(
			/either colorScheme or domain must be set/,
		)
	})
})
