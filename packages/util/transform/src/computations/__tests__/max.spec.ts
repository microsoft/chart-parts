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
				expect(maxObservable.value).toEqual(10)
				expect(maxes.length).toEqual(0)
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
				expect(maxObservable.value).toEqual(10)
				expect(maxes).toEqual([undefined, 1, 2, 10])
				done()
			},
		)
	})
})
