import { dataset } from '../dataset'
import { countPattern } from '../countPattern'

describe('The countPattern transform', () => {
	it('can count instances of a pattern in text data', () => {
		const data = [
			{ comment: 'between 12 and 12.43' },
			{ comment: "43 minutes past 12 o'clock (and 13 seconds)" },
		]
		const ds = dataset().add(
			'data',
			data,
			countPattern('comment')
				.pattern('\\d+')
				.stopWords('13'),
		)

		const counted = (ds.get('data') as any[]).map(d => ({
			text: d.text,
			count: d.count,
		}))
		expect(counted).toEqual([
			{ text: '12', count: 3 },
			{ text: '43', count: 2 },
		])
	})
})
