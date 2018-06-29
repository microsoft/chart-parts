import { Axis, AxisOrientation } from '@gog/interfaces'

export class AxisBuilder {
	private scaleName: string | undefined
	private orientValue: AxisOrientation | undefined

	/**
	 * Sets the name of the scale to use for drawing this axis.
	 * @param value The name of the scale to use
	 */
	public scale(value: string) {
		this.scaleName = value
		return this
	}

	/**
	 * Sets the axis orientation, which is where in the view-space this
	 * axis will be drawn
	 */
	public orient(value: AxisOrientation) {
		this.orientValue = value
		return this
	}

	public build(): Axis {
		if (!this.scaleName) {
			throw new Error('scale name must be defined')
		}
		if (!this.orientValue) {
			throw new Error('axis orientation must be defined')
		}

		return {
			scale: this.scaleName,
			orient: this.orientValue,
		}
	}
}
