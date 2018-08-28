import mean from '../mean'
import { from } from 'rxjs'
import { takeLast } from 'rxjs/operators'
import { numberStream } from './util'
import valid from '../valid'

describe('The mean computation node', () => {
	it('can determine the mean value in a static array of numbers', done => {
		const means = []
		from([1, 2, 10, 7, 5])
			.pipe(
				mean(),
				takeLast(1),
			)
			.subscribe(
				v => means.push(v),
				err => done(err),
				() => {
					expect(means).toEqual([5])
					done()
				},
			)
	})

	it('can determine the mean value in an async number stream', done => {
		const means = []
		numberStream([1, 2, 1, -1, 10, 7, 5])
			.pipe(
				mean(),
				takeLast(1),
			)
			.subscribe(
				v => means.push(v),
				err => done(err),
				() => {
					expect(means[0]).toBeCloseTo(3.571428)
					done()
				},
			)
	})
})
