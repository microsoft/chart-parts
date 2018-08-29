import { argmin$, argmin } from '../argmin'
import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import * as _ from 'lodash'

const point = (x: number, y: number) => ({ x, y })

describe('The argmin computation node', () => {
	describe('the observable version', () => {
		it('can determine the minimum value in a static array of numbers', async () => {
			const mins = await from([point(1, 3), point(2, 5), point(-1, 100)])
				.pipe(
					argmin$('x'),
					toArray(),
				)
				.toPromise()
			expect(mins).toEqual([point(1, 3), point(1, 3), point(-1, 100)])
		})
	})

	describe('the array version', () => {
		it('can determine the minimum value in a static array of numbers', () => {
			const data = [point(1, 3), point(2, 5), point(-1, 100)]
			const min = _.flow([argmin('x')])(data)
			expect(min).toEqual(point(-1, 100))
		})
	})
})
