import min from '../min'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The min computation node', () => {
	it('can determine the minimum value in a static array of numbers', done => {
		const mins = []

		from([10, 2, 7, 1, 5])
			.pipe(min())
			.subscribe(
				v => mins.push(v),
				err => done(err),
				() => {
					expect(mins).toEqual([10, 2, 2, 1, 1])
					done()
				},
			)
	})

	it('can determine the minimum value in an async number stream', done => {
		const mins = []
		numberStream([1, 2, 1, -1, -50, 10, 7, 5])
			.pipe(min())
			.subscribe(
				v => mins.push(v),
				err => done(err),
				() => {
					expect(mins).toEqual([1, 1, 1, -1, -50, -50, -50, -50])
					done()
				},
			)
	})
})
