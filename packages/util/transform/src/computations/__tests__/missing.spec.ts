import { missing } from '../missing'
import { from } from 'rxjs'
import { numberStream } from './util'
import { toArray } from 'rxjs/operators'

describe('The missing computation node', () => {
	it('can determine the missing of values in a static array of numbers', async () => {
		const missings = await from([10, null, NaN, undefined, 7, 1, 5])
			.pipe(
				missing(),
				toArray(),
			)
			.toPromise()
		expect(missings).toEqual([0, 1, 2, 3, 3, 3, 3])
	})

	it('can determine the missing of values in an async number stream', async () => {
		const missings = await numberStream([1, 2, null, NaN, undefined, 10, 7, 5])
			.pipe(
				missing(),
				toArray(),
			)
			.toPromise()
		expect(missings).toEqual([0, 0, 1, 2, 3, 3, 3, 3])
	})
})
