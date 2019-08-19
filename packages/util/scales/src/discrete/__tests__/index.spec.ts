import * as index from '../index'

describe('The discrete scale index', () => {
	it('contains the discrete scales', () => {
		const scales = Object.keys(index)
		expect(scales.length).toEqual(3)
		expect(index.BandScale).toBeDefined()
		expect(index.PointScale).toBeDefined()
		expect(index.OrdinalScale).toBeDefined()
	})
})
