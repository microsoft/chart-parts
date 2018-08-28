import missing from '../missing'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The missing computation node', () => {
	it('can determine the missing of values in a static array of numbers', done => {
		const values = from([10, null, NaN, undefined, 7, 1, 5])
		const missings = []
		const missingObservable = missing(values)

		missingObservable.subscribe(
			v => missings.push(v),
			err => done(err),
			() => {
				expect(missings).toEqual([0, 1, 2, 3, 3, 3, 3])
				done()
			},
		)
	})

	it('can determine the missing of values in an async number stream', done => {
		const numbers = numberStream([1, 2, null, NaN, undefined, 10, 7, 5])
		const missings = []
		const missingObservable = missing(numbers)
		missingObservable.subscribe(
			v => missings.push(v),
			err => done(err),
			() => {
				expect(missings).toEqual([0, 0, 1, 2, 3, 3, 3, 3])
				done()
			},
		)
	})
})
