import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { groupBy$, groupBy } from '../groupBy'
import * as _ from 'lodash'

describe('The group by function', () => {
	describe('the observable version', () => {
		it('can group an incoming data stream', done => {
			from([
				{ a: 0, b: 'a', c: 6.3 },
				{ a: 0, b: 'a', c: 4.2 },
				{ a: 0, b: 'b', c: 6.8 },
				{ a: 0, b: 'c', c: 5.1 },
				{ a: 1, b: 'b', c: 4.4 },
				{ a: 2, b: 'b', c: 3.5 },
				{ a: 2, b: 'c', c: 6.2 },
			])
				.pipe(
					groupBy$('a', 'b'),
					toArray(),
				)
				.subscribe(groups => {
					expect(groups.length).toEqual(6)
					done()
				})
		})
	})

	describe('the array version', () => {
		it('can group incoming data', () => {
			const data = [
				{ a: 0, b: 'a', c: 6.3 },
				{ a: 0, b: 'a', c: 4.2 },
				{ a: 0, b: 'b', c: 6.8 },
				{ a: 0, b: 'c', c: 5.1 },
				{ a: 1, b: 'b', c: 4.4 },
				{ a: 2, b: 'b', c: 3.5 },
				{ a: 2, b: 'c', c: 6.2 },
			]
			const grouped = _.flow([groupBy('a', 'b')])(data)
			expect(grouped.length).toEqual(6)
		})
	})
})
