/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { dataset, cross } from '..'

describe('The cross transform', () => {
	it('can count instances of a pattern in text data', () => {
		const data = [{ v: 1 }, { v: 2 }, { v: 3 }]

		const ds = dataset()
			.addTable('data-crossed', data, cross())
			.addTable(
				'data-crossed-and-filtered',
				data,
				cross().filter((d: any) => d.a !== d.b),
			)

		const mapRow = (d: any) => ({
			a: { v: d.a.v },
			b: { v: d.b.v },
		})

		const crossed = (ds.getTable('data-crossed') as any[]).map(mapRow)
		const crossedAndFiltered = (ds.getTable(
			'data-crossed-and-filtered',
		) as any[]).map(mapRow)

		expect(crossed).toEqual([
			{ a: { v: 1 }, b: { v: 1 } },
			{ a: { v: 1 }, b: { v: 2 } },
			{ a: { v: 1 }, b: { v: 3 } },
			{ a: { v: 2 }, b: { v: 1 } },
			{ a: { v: 2 }, b: { v: 2 } },
			{ a: { v: 2 }, b: { v: 3 } },
			{ a: { v: 3 }, b: { v: 1 } },
			{ a: { v: 3 }, b: { v: 2 } },
			{ a: { v: 3 }, b: { v: 3 } },
		])

		expect(crossedAndFiltered).toEqual([
			{ a: { v: 1 }, b: { v: 2 } },
			{ a: { v: 1 }, b: { v: 3 } },
			{ a: { v: 2 }, b: { v: 1 } },
			{ a: { v: 2 }, b: { v: 3 } },
			{ a: { v: 3 }, b: { v: 1 } },
			{ a: { v: 3 }, b: { v: 2 } },
		])
	})
})
