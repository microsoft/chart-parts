import max from '../max'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The max computation node', () => {
	it('can determine the maximum value in a static array of numbers', done => {
		const values = from([1, 2, 10, 7, 5])
		const maxes = []
		const maxObservable = max(values)

		maxObservable.subscribe(
			v => maxes.push(v),
			err => done(err),
			() => {
				expect(maxes).toEqual([1, 2, 10, 10, 10])
				done()
			},
		)
	})

	it('can determine the maximum value in an async number stream', done => {
		const numbers = numberStream([1, 2, 1, -1, 10, 7, 5])
		const maxes = []
		const maxObservable = max(numbers)
		maxObservable.subscribe(
			v => maxes.push(v),
			err => done(err),
			() => {
				expect(maxes).toEqual([1, 2, 2, 2, 10, 10, 10])
				done()
			},
		)
	})
})
