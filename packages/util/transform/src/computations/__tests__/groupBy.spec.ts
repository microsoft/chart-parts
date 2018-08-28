import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import groupBy from '../groupBy'

describe('The group by function', () => {
	it('can group an incoming data stream', done => {
		const data = [
			{ a: 0, b: 'a', c: 6.3 },
			{ a: 0, b: 'a', c: 4.2 },
			{ a: 0, b: 'b', c: 6.8 },
			{ a: 0, b: 'c', c: 5.1 },
			{ a: 1, b: 'b', c: 4.4 },
			{ a: 2, b: 'b', c: 3.5 },
			{ a: 2, b: 'c', c: 6.2 },
		]
		const grouped = groupBy([row => row.a, row => row.b], from(data))
		grouped.pipe(toArray()).subscribe(groups => {
			expect(groups.length).toEqual(6)
			done()
		})
	})
})
