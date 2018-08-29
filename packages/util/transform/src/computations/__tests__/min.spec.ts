import { min } from '../min'
import { from } from 'rxjs'
import { stream } from './util'
import { toArray } from 'rxjs/operators'

describe('The min computation node', () => {
	it('can determine the minimum value in a static array of numbers', async () => {
		const mins = await from([10, 2, 7, 1, 5])
			.pipe(
				min(),
				toArray(),
			)
			.toPromise()
		expect(mins).toEqual([10, 2, 2, 1, 1])
	})

	it('can determine the minimum value in an async number stream', async () => {
		const mins = await stream([1, 2, 1, -1, -50, 10, 7, 5])
			.pipe(
				min(),
				toArray(),
			)
			.toPromise()
		expect(mins).toEqual([1, 1, 1, -1, -50, -50, -50, -50])
	})
})
