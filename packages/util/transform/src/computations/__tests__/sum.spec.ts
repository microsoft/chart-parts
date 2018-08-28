import sum from '../sum'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The sum computation node', () => {
	it('can determine the sum of values in a static array of numbers', done => {
		const sums = []
		from([10, 2, 7, 1, 5])
			.pipe(sum())
			.subscribe(
				v => sums.push(v),
				err => done(err),
				() => {
					expect(sums).toEqual([10, 12, 19, 20, 25])
					done()
				},
			)
	})

	it('can determine the sum of values in an async number stream', done => {
		const sums = []
		numberStream([1, -1, -50, 50, 7, 5])
			.pipe(sum())
			.subscribe(
				v => sums.push(v),
				err => done(err),
				() => {
					expect(sums).toEqual([1, 0, -50, 0, 7, 12])
					done()
				},
			)
	})
})
