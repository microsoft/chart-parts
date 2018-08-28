import { distinct } from '../distinct'
import { from } from 'rxjs'
import { numberStream } from './util'
import { toArray } from 'rxjs/operators'

describe('The distinct computation node', () => {
	it('can determine the count of distinct values in a static array of numbers', async () => {
		const distincts = await from([10, 2, 7, 1, 10, 2])
			.pipe(
				distinct(),
				toArray(),
			)
			.toPromise()

		expect(distincts).toEqual([1, 2, 3, 4, 4, 4])
	})

	it('can determine the count of distinct values in an async number stream', async () => {
		const distincts = await numberStream([1, 2, 1, 2, 3, 4, 5])
			.pipe(
				distinct(),
				toArray(),
			)
			.toPromise()
		expect(distincts).toEqual([1, 2, 2, 2, 3, 4, 5])
	})
})
