import { stack } from '../stack'
import { dataset } from '../dataset'
import { Offset, CompareOrder } from '../../interfaces'

const data = [
	{ x: 0, y: 28, c: 0 },
	{ x: 0, y: 55, c: 1 },
	{ x: 1, y: 43, c: 0 },
	{ x: 1, y: 91, c: 1 },
	{ x: 2, y: 81, c: 0 },
	{ x: 2, y: 53, c: 1 },
	{ x: 3, y: 19, c: 0 },
	{ x: 3, y: 87, c: 1 },
	{ x: 4, y: 52, c: 0 },
	{ x: 4, y: 48, c: 1 },
	{ x: 5, y: 24, c: 0 },
	{ x: 5, y: 49, c: 1 },
	{ x: 6, y: 87, c: 0 },
	{ x: 6, y: 66, c: 1 },
	{ x: 7, y: 17, c: 0 },
	{ x: 7, y: 27, c: 1 },
	{ x: 8, y: 68, c: 0 },
	{ x: 8, y: 16, c: 1 },
	{ x: 9, y: 49, c: 0 },
	{ x: 9, y: 15, c: 1 },
]

describe('The stack transformation', () => {
	it('can stack values', () => {
		const ds = dataset()
			.add('data', data, stack('y'))
			.add('data-grouped', data, stack('y').groupBy('x'))
			.add(
				'data-grouped-sorted-and-offset',
				data,
				stack('y')
					.groupBy('x')
					.sort({ field: 'c', order: CompareOrder.descending })
					.offset(Offset.center),
			)

		// The result should not be the same instance (i.e. preserve the input for functional style)
		expect(ds.get('data')).toMatchSnapshot()
		expect(ds.get('data-grouped')).toMatchSnapshot()
		expect(ds.get('data-grouped-sorted-and-offset')).toMatchSnapshot()
	})
})
