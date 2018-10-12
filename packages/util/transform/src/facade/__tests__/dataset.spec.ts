/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { dataset, formula } from '../'

describe('the dataset manager', () => {
	it('can create a new dataset manager with a basic table', () => {
		const ds = dataset().addTable('mydata', [{ x: 1 }, { x: 2 }, { x: 3 }])
		expect(ds.getTable('mydata').map(d => d.x)).toEqual([1, 2, 3])
	})

	it('can create a new dataset manager with a basic table using transformations', () => {
		const ds = dataset().addTable(
			'mydata',
			[{ x: 1 }, { x: 2 }, { x: 3 }],
			formula(t => t.x * 2).as('y'),
		)

		expect(ds.getTable('mydata').map(d => d.x)).toEqual([1, 2, 3])
		expect(ds.getTable('mydata').map(d => d.y)).toEqual([2, 4, 6])
	})

	it('can create a new dataset manager with a basic table and a derived table', () => {
		const ds = dataset()
			.addTable(
				'source',
				[{ x: 1 }, { x: 2 }, { x: 3 }],
				formula(t => t.x * 2).as('y'),
			)
			.addDerivedTable('derived', 'source', formula(t => t.y * 2).as('z'))

		const source = ds.getTable('source')
		const derived = ds.getTable('derived')
		expect(source.length).toEqual(3)
		expect(source.map(d => d.x)).toEqual([1, 2, 3])
		expect(source.map(d => d.y)).toEqual([2, 4, 6])

		expect(derived.length).toEqual(3)
		expect(derived.map(d => d.z)).toEqual([4, 8, 12])
	})
})
