/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { dataset, aggregate, AggregateOperation } from '../'

describe('The data management facade', () => {
	describe('the dataset() factory function', () => {
		it('can create a new dataset', () => {
			expect(dataset()).toBeDefined()
		})

		it('can add new raw data tables', () => {
			const table = [{ x: 1 }, { x: 2 }, { x: 3 }]
			const ds = dataset().addTable('table', table)
			expect(ds.getTable('table')).toEqual(table)
		})

		it('can perform a basic aggregation', () => {
			// this sample is from the aggregate docs here https://vega.github.io/vega/docs/transforms/aggregate/
			const data = [
				{ foo: 1, bar: 1 },
				{ foo: 1, bar: 2 },
				{ foo: null, bar: 3 },
			]

			const ds = dataset().addTable(
				'table',
				data,
				aggregate().compute(
					{ field: 'foo', op: AggregateOperation.valid, as: 'v' },
					{ field: 'bar', op: AggregateOperation.sum, as: 's' },
					{ field: 'bar', op: AggregateOperation.median, as: 'm' },
				),
			)

			const aggregated = ds.getTable('table')
			expect(aggregated[0].v).toEqual(2)
			expect(aggregated[0].s).toEqual(6)
			expect(aggregated[0].m).toEqual(2)
		})

		it('can perform a basic groupby aggregation', () => {
			const data = [
				{ foo: 'a', bar: 1 },
				{ foo: 'a', bar: 2 },
				{ foo: 'b', bar: 3 },
			]

			const ds = dataset().addTable('table', data, aggregate().groupBy('foo'))
			const aggregated = ds.getTable('table')
			expect(aggregated.length).toEqual(2)
		})
	})
})
