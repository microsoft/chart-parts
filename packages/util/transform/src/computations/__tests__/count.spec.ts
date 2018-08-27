import count from '../count'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The count computation node', () => {
	it('can determine the count of values in a static array of numbers', done => {
		const values = from([10, 2, 7, 1, 5])
		const counts = []
		const countObservable = count(values)

		countObservable.subscribe(
			v => counts.push(v),
			err => done(err),
			() => {
				expect(countObservable.value).toEqual(5)
				expect(counts.length).toEqual(0)
				done()
			},
		)
	})

	it('can determine the count of values in an async number stream', done => {
		const numbers = numberStream([1, 2, 1, -1, -50, 10, 7, 5])
		const counts = []
		const countObservable = count(numbers)
		countObservable.subscribe(
			v => counts.push(v),
			err => done(err),
			() => {
				expect(countObservable.value).toEqual(8)
				expect(counts).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
				done()
			},
		)
	})
})
