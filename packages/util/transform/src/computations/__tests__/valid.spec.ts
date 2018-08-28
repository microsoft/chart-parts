import valid from '../valid'
import { from } from 'rxjs'
import { numberStream } from './util'
import { toArray } from 'rxjs/operators'

describe('The valid computation node', () => {
	it('can determine the valid of values in a static array of numbers', async () => {
		const valids = await from([10, null, NaN, undefined, 7, 1, 5])
			.pipe(
				valid(),
				toArray(),
			)
			.toPromise()
		expect(valids).toEqual([1, 1, 1, 1, 2, 3, 4])
	})

	it('can determine the valid of values in an async number stream', async () => {
		const valids = await numberStream([1, 2, null, NaN, undefined, 10, 7, 5])
			.pipe(
				valid(),
				toArray(),
			)
			.toPromise()
		expect(valids).toEqual([1, 2, 2, 2, 2, 3, 4, 5])
	})
})
