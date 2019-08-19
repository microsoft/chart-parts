import * as index from '../index'

describe('The quantitative scale index', () => {
	it('contains the discrete scales', () => {
		const scales = Object.keys(index)
		expect(scales.length).toEqual(7)
		expect(index.LinearScale).toBeDefined()
		expect(index.LogScale).toBeDefined()
		expect(index.PowScale).toBeDefined()
		expect(index.SequantialScale).toBeDefined()
		expect(index.SqrtScale).toBeDefined()
		expect(index.TimeScale).toBeDefined()
		expect(index.UtcScale).toBeDefined()
	})
})
