import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { accessField$, accessField } from '../accessField'
import { stream } from './util'
import * as _ from 'lodash'

describe('The accessField computation node', () => {
	describe('the observable version', () => {
		it('can determine the access fields in a dataset of values in a static array of numbers', async () => {
			const counts = await from([{ x: 1 }, { x: 2 }, { x: 3 }])
				.pipe(
					accessField$('x'),
					toArray(),
				)
				.toPromise()
			expect(counts).toEqual([1, 2, 3])
		})
		it('can determine the count of values in an async number stream', async () => {
			const counts = await stream([{ x: 1 }, { x: 2 }, { x: 3 }])
				.pipe(
					accessField$('x'),
					toArray(),
				)
				.toPromise()
			expect(counts).toEqual([1, 2, 3])
		})
	})

	describe('the array version', () => {
		it('can determine the access fields in a dataset of values in a static array of numbers', async () => {
			const data = [{ x: 1 }, { x: 2 }, { x: 3 }]
			const counts = _.flow([accessField('x')])(data)
			expect(counts).toEqual([1, 2, 3])
		})
	})
})
