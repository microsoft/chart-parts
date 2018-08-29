import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { count$, count } from '../count'
import { stream } from './util'
import * as _ from 'lodash'

describe('The count computation node', () => {
	describe('the observable version', () => {
		it('can determine the count of values in a static array of numbers', async () => {
			const counts = await from([10, 2, 7, 1, 5])
				.pipe(
					count$(),
					toArray(),
				)
				.toPromise()
			expect(counts).toEqual([1, 2, 3, 4, 5])
		})

		it('can determine the count of values in an async number stream', async () => {
			const counts = await stream([1, 2, 1, -1, -50, 10, 7, 5])
				.pipe(
					count$(),
					toArray(),
				)
				.toPromise()
			expect(counts).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
		})
	})

	describe('the array version', () => {
		it('can determine the count of values in a static array of numbers', async () => {
			const data = [10, 2, 7, 1, 5]
			const result = _.flow([count()])(data)
			expect(result).toEqual(5)
		})
	})
})
