/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { collect, dataset } from '..'
import { CompareOrder } from '../../interfaces'

describe('The collect transformer', () => {
	it('can sort data', () => {
		const data = [{ x: 3 }, { x: 5 }, { x: -1 }, { x: 7 }]
		const ds = dataset()
			.addTable(
				'data-asc',
				data,
				collect().sort({ field: 'x', order: CompareOrder.ascending }),
			)
			.addTable(
				'data-desc',
				data,
				collect().sort({ field: 'x', order: CompareOrder.descending }),
			)

		expect((ds.getTable('data-asc') as any[]).map(d => d.x)).toEqual([
			-1,
			3,
			5,
			7,
		])
		expect((ds.getTable('data-desc') as any[]).map(d => d.x)).toEqual([
			7,
			5,
			3,
			-1,
		])
	})
})
