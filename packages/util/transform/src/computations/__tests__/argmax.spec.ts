import { argmax$, argmax } from '../argmax'
import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import * as _ from 'lodash'

const point = (x: number, y: number) => ({ x, y })

describe('The argmax computation node', () => {
	describe('the observable version', () => {
		it('can determine the minimum value in a static array of numbers', async () => {
			const mins = await from([point(1, 3), point(2, 5), point(-1, 100)])
				.pipe(
					argmax$('x'),
					toArray(),
				)
				.toPromise()
			expect(mins).toEqual([point(1, 3), point(2, 5), point(2, 5)])
		})
	})

	describe('the array version', () => {
		const data = [point(1, 3), point(2, 5), point(-1, 100)]
		const mins = _.flow([argmax('x')])(data)
		expect(mins).toEqual(point(2, 5))
	})
})
