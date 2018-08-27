import min from '../min'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The min computation node', () => {
	it('can determine the minimum value in a static array of numbers', done => {
		const values = from([10, 2, 7, 1, 5])
		const mins = []
		const minObservable = min(values)

		minObservable.subscribe(
			v => mins.push(v),
			err => done(err),
			() => {
				expect(minObservable.value).toEqual(1)
				expect(mins.length).toEqual(0)
				done()
			},
		)
	})

	it('can determine the minimum value in an async number stream', done => {
		const numbers = numberStream([1, 2, 1, -1, -50, 10, 7, 5])
		const mins = []
		const minObservable = min(numbers)
		minObservable.subscribe(
			v => mins.push(v),
			err => done(err),
			() => {
				expect(minObservable.value).toEqual(-50)
				expect(mins).toEqual([undefined, 1, -1, -50])
				done()
			},
		)
	})
})
