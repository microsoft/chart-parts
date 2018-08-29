import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { sum } from '../sum'
import { stream } from './util'

describe('The sum computation node', () => {
	it('can determine the sum of values in a static array of numbers', async () => {
		const sums = await from([10, 2, 7, 1, 5])
			.pipe(
				sum(),
				toArray(),
			)
			.toPromise()
		expect(sums).toEqual([10, 12, 19, 20, 25])
	})

	it('can determine the sum of values in an async number stream', async () => {
		const sums = await stream([1, -1, -50, 50, 7, 5])
			.pipe(
				sum(),
				toArray(),
			)
			.toPromise()
		expect(sums).toEqual([1, 0, -50, 0, 7, 12])
	})
})
