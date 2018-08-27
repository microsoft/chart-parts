import sum from '../sum'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The sum computation node', () => {
	it('can determine the sum of values in a static array of numbers', done => {
		const values = from([10, 2, 7, 1, 5])
		const sums = []
		const sumObservable = sum(values)

		sumObservable.subscribe(
			v => sums.push(v),
			err => done(err),
			() => {
				expect(sumObservable.value).toEqual(25)
				expect(sums.length).toEqual(0)
				done()
			},
		)
	})

	it('can determine the sum of values in an async number stream', done => {
		const numbers = numberStream([1, -1, -50, 50, 7, 5])
		const sums = []
		const sumObservable = sum(numbers)
		sumObservable.subscribe(
			v => sums.push(v),
			err => done(err),
			() => {
				expect(sumObservable.value).toEqual(12)
				expect(sums).toEqual([0, 1, 0, -50, 0, 7, 12])
				done()
			},
		)
	})
})
