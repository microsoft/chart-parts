import { distinct$, distinct } from '../distinct'
import { from } from 'rxjs'
import { stream } from './util'
import { toArray } from 'rxjs/operators'
import * as _ from 'lodash'

describe('The distinct computation node', () => {
	describe('the observable version', () => {
		it('can determine the count of distinct values in a static array of numbers', async () => {
			const distincts = await from([10, 2, 7, 1, 10, 2])
				.pipe(
					distinct$(),
					toArray(),
				)
				.toPromise()

			expect(distincts).toEqual([10, 2, 7, 1])
		})

		it('can determine the count of distinct values in an async number stream', async () => {
			const distincts = await stream([1, 2, 1, 2, 3, 4, 5])
				.pipe(
					distinct$(),
					toArray(),
				)
				.toPromise()
			expect(distincts).toEqual([1, 2, 3, 4, 5])
		})
	})

	describe('the array version', () => {
		it('can determine the count of distinct values in a static array of numbers', () => {
			const data = [10, 2, 7, 1, 10, 2]
			const distinctData = _.flow([distinct()])(data)
			expect(distinctData).toEqual([10, 2, 7, 1])
		})
	})
})
