import { determineRemainingSpace } from '../determineRemainingSpace'
import { AxisOrientation } from '@gog/interfaces'

describe('determineRemainingSpace', () => {
	it('can cull space from a top-axis', () => {
		const result = determineRemainingSpace({ width: 100, height: 100 }, [
			{ thickness: 10, orient: AxisOrientation.Top },
		])

		expect(result.origin.x).toEqual(0)
		expect(result.origin.y).toEqual(10)
		expect(result.shape.width).toEqual(100)
		expect(result.shape.height).toEqual(90)
	})

	it('can cull space from a right-axis', () => {
		const result = determineRemainingSpace({ width: 100, height: 100 }, [
			{ thickness: 10, orient: AxisOrientation.Right },
		])

		expect(result.origin.x).toEqual(0)
		expect(result.origin.y).toEqual(0)
		expect(result.shape.width).toEqual(90)
		expect(result.shape.height).toEqual(100)
	})

	it('can cull space from a bottom-axis', () => {
		const result = determineRemainingSpace({ width: 100, height: 100 }, [
			{ thickness: 10, orient: AxisOrientation.Bottom },
		])

		expect(result.origin.x).toEqual(0)
		expect(result.origin.y).toEqual(0)
		expect(result.shape.width).toEqual(100)
		expect(result.shape.height).toEqual(90)
	})

	it('can cull space from a left-axis', () => {
		const result = determineRemainingSpace({ width: 100, height: 100 }, [
			{ thickness: 10, orient: AxisOrientation.Left },
		])

		expect(result.origin.x).toEqual(10)
		expect(result.origin.y).toEqual(0)
		expect(result.shape.width).toEqual(90)
		expect(result.shape.height).toEqual(100)
	})

	it('can cull space from combined axes', () => {
		const result = determineRemainingSpace({ width: 100, height: 100 }, [
			{ thickness: 10, orient: AxisOrientation.Left },
			{ thickness: 10, orient: AxisOrientation.Right },
			{ thickness: 10, orient: AxisOrientation.Top },
			{ thickness: 10, orient: AxisOrientation.Bottom },
		])

		expect(result.origin.x).toEqual(10)
		expect(result.origin.y).toEqual(10)
		expect(result.shape.width).toEqual(80)
		expect(result.shape.height).toEqual(80)
	})
})
