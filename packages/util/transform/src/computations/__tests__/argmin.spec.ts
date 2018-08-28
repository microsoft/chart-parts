import { argmin } from '../argmin'
import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'

const point = (x: number, y: number) => ({ x, y })

describe('The argmin computation node', () => {
	it('can determine the minimum value in a static array of numbers', async () => {
		const mins = await from([point(1, 3), point(2, 5), point(-1, 100)])
			.pipe(
				argmin('x'),
				toArray(),
			)
			.toPromise()
		expect(mins).toEqual([point(1, 3), point(1, 3), point(-1, 100)])
	})
})
