import missing from '../missing'
import { from } from 'rxjs'
import { numberStream } from './util'

describe('The missing computation node', () => {
	it('can determine the missing of values in a static array of numbers', done => {
		const missings = []
		from([10, null, NaN, undefined, 7, 1, 5])
			.pipe(missing())
			.subscribe(
				v => missings.push(v),
				err => done(err),
				() => {
					expect(missings).toEqual([0, 1, 2, 3, 3, 3, 3])
					done()
				},
			)
	})

	it('can determine the missing of values in an async number stream', done => {
		const missings = []
		numberStream([1, 2, null, NaN, undefined, 10, 7, 5])
			.pipe(missing())
			.subscribe(
				v => missings.push(v),
				err => done(err),
				() => {
					expect(missings).toEqual([0, 0, 1, 2, 3, 3, 3, 3])
					done()
				},
			)
	})
})
