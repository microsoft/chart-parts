import { collect } from '../collect'
import { dataset } from '../dataset'
import { CompareOrder } from '../../interfaces'

describe('The collect transformer', () => {
	it('can sort data', () => {
		const data = [{ x: 3 }, { x: 5 }, { x: -1 }, { x: 7 }]
		const ds = dataset()
			.add(
				'data-asc',
				data,
				collect().sort({ field: 'x', order: CompareOrder.ascending }),
			)
			.add(
				'data-desc',
				data,
				collect().sort({ field: 'x', order: CompareOrder.descending }),
			)

		expect((ds.get('data-asc') as any[]).map(d => d.x)).toEqual([-1, 3, 5, 7])
		expect((ds.get('data-desc') as any[]).map(d => d.x)).toEqual([7, 5, 3, -1])
	})
})
