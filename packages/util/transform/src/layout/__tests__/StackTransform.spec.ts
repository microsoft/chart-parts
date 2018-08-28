import { StackTransform } from '../StackTransform'

describe('StackTransform', () => {
	it('can stack values', () => {
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

		const stacker = new StackTransform()
			.field('y')
			.sort({ field: 'c' })
			.groupBy(r => r.x)

		const sltResult = stacker.transform(data)

		// The result should not be the same instance (i.e. preserve the input for functional style)
		expect(sltResult).not.toBe(data)
		expect(sltResult).toEqual([
			{ x: 0, y: 28, c: 0, y0: 0, y1: 28 },
			{ x: 0, y: 55, c: 1, y0: 28, y1: 83 },
			{ x: 1, y: 43, c: 0, y0: 0, y1: 43 },
			{ x: 1, y: 91, c: 1, y0: 43, y1: 134 },
			{ x: 2, y: 81, c: 0, y0: 0, y1: 81 },
			{ x: 2, y: 53, c: 1, y0: 81, y1: 134 },
			{ x: 3, y: 19, c: 0, y0: 0, y1: 19 },
			{ x: 3, y: 87, c: 1, y0: 19, y1: 106 },
			{ x: 4, y: 52, c: 0, y0: 0, y1: 52 },
			{ x: 4, y: 48, c: 1, y0: 52, y1: 100 },
			{ x: 5, y: 24, c: 0, y0: 0, y1: 24 },
			{ x: 5, y: 49, c: 1, y0: 24, y1: 73 },
			{ x: 6, y: 87, c: 0, y0: 0, y1: 87 },
			{ x: 6, y: 66, c: 1, y0: 87, y1: 153 },
			{ x: 7, y: 17, c: 0, y0: 0, y1: 17 },
			{ x: 7, y: 27, c: 1, y0: 17, y1: 44 },
			{ x: 8, y: 68, c: 0, y0: 0, y1: 68 },
			{ x: 8, y: 16, c: 1, y0: 68, y1: 84 },
			{ x: 9, y: 49, c: 0, y0: 0, y1: 49 },
			{ x: 9, y: 15, c: 1, y0: 49, y1: 64 },
		])
	})
})
