import { mean } from '../mean'
import { from } from 'rxjs'
import { takeLast, toArray } from 'rxjs/operators'
import { stream } from './util'

describe('The mean computation node', () => {
	it('can determine the mean value in a static array of numbers', async () => {
		const means = await from([1, 2, 10, 7, 5])
			.pipe(
				mean(),
				takeLast(1),
				toArray(),
			)
			.toPromise()
		expect(means).toEqual([5])
	})

	it('can determine the mean value in an async number stream', async () => {
		const means = await stream([1, 2, 1, -1, 10, 7, 5])
			.pipe(
				mean(),
				takeLast(1),
				toArray(),
			)
			.toPromise()
		expect(means[0]).toBeCloseTo(3.571428)
	})
})
