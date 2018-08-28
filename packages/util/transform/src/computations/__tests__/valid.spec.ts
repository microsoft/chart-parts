import valid from '../valid'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The valid computation node', () => {
	it('can determine the valid of values in a static array of numbers', done => {
		const values = from([10, null, NaN, undefined, 7, 1, 5])
		const valids = []
		const validObservable = valid(values)

		validObservable.subscribe(
			v => valids.push(v),
			err => done(err),
			() => {
				expect(valids).toEqual([1, 1, 1, 1, 2, 3, 4])
				done()
			},
		)
	})

	it('can determine the valid of values in an async number stream', done => {
		const numbers = numberStream([1, 2, null, NaN, undefined, 10, 7, 5])
		const valids = []
		const validObservable = valid(numbers)
		validObservable.subscribe(
			v => valids.push(v),
			err => done(err),
			() => {
				expect(valids).toEqual([1, 2, 2, 2, 2, 3, 4, 5])
				done()
			},
		)
	})
})
