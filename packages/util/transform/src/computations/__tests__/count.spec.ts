import { from } from 'rxjs'
import count from '../count'
import { numberStream } from './util'

describe('The count computation node', () => {
	it('can determine the count of values in a static array of numbers', done => {
		const counts = []
		from([10, 2, 7, 1, 5])
			.pipe(count())
			.subscribe(
				v => counts.push(v),
				err => done(err),
				() => {
					expect(counts).toEqual([1, 2, 3, 4, 5])
					done()
				},
			)
	})

	it('can determine the count of values in an async number stream', done => {
		const counts = []
		numberStream([1, 2, 1, -1, -50, 10, 7, 5])
			.pipe(count())
			.subscribe(
				v => counts.push(v),
				err => done(err),
				() => {
					expect(counts).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
					done()
				},
			)
	})
})
