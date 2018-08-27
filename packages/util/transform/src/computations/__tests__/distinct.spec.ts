import distinct from '../distinct'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The distinct computation node', () => {
	it('can determine the count of distinct values in a static array of numbers', done => {
		const values = from([10, 2, 7, 1, 10, 2])
		const distincts = []
		const distinctObservable = distinct(values)
		distinctObservable.subscribe(
			v => distincts.push(v),
			err => done(err),
			() => {
				expect(distinctObservable.value).toEqual(4)
				expect(distincts.length).toEqual(0)
				done()
			},
		)
	})

	it('can determine the count of distinct values in an async number stream', done => {
		const numbers = numberStream([1, 2, 1, 2, 3, 4, 5])
		const distincts = []
		const distinctObservable = distinct(numbers)
		distinctObservable.subscribe(
			v => distincts.push(v),
			err => done(err),
			() => {
				expect(distinctObservable.value).toEqual(5)
				expect(distincts).toEqual([0, 1, 2, 3, 4, 5])
				done()
			},
		)
	})
})
