import distinct from '../distinct'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The distinct computation node', () => {
	it('can determine the count of distinct values in a static array of numbers', done => {
		const distincts = []
		from([10, 2, 7, 1, 10, 2])
			.pipe(distinct())
			.subscribe(
				v => distincts.push(v),
				err => done(err),
				() => {
					expect(distincts).toEqual([1, 2, 3, 4, 4, 4])
					done()
				},
			)
	})

	it('can determine the count of distinct values in an async number stream', done => {
		const distincts = []
		numberStream([1, 2, 1, 2, 3, 4, 5])
			.pipe(distinct())
			.subscribe(
				v => distincts.push(v),
				err => done(err),
				() => {
					expect(distincts).toEqual([1, 2, 2, 2, 3, 4, 5])
					done()
				},
			)
	})
})
