import { max } from '../max'
import { from } from 'rxjs'
import { stream } from './util'
import { toArray } from 'rxjs/operators'

describe('The max computation node', () => {
	it('can determine the maximum value in a static array of numbers', async () => {
		const maxes = await from([1, 2, 10, 7, 5])
			.pipe(
				max(),
				toArray(),
			)
			.toPromise()

		expect(maxes).toEqual([1, 2, 10, 10, 10])
	})

	it('can determine the maximum value in an async number stream', async () => {
		const maxes = await stream([1, 2, 1, -1, 10, 7, 5])
			.pipe(
				max(),
				toArray(),
			)
			.toPromise()
		expect(maxes).toEqual([1, 2, 2, 2, 10, 10, 10])
	})
})
