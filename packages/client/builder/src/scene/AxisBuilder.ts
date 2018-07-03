import { Axis, AxisOrientation } from '@gog/interfaces'

export class AxisBuilder {
	private scaleName: string | undefined
	private orientValue: AxisOrientation | undefined
	private ticksValue: boolean | undefined = true
	private domainValue: boolean | undefined = true
	private domainColorValue: string | undefined = '#555'
	private domainWidthValue: number | undefined = 0.5

	/**
	 * Sets the name of the scale to use for drawing this axis.
	 * @param value The name of the scale to use
	 */
	public scale(value: string): AxisBuilder {
		this.scaleName = value
		return this
	}

	/**
	 * Sets the axis orientation, which is where in the view-space this
	 * axis will be drawn
	 */
	public orient(value: AxisOrientation): AxisBuilder {
		this.orientValue = value
		return this
	}

	public ticks(value: boolean | undefined): AxisBuilder {
		this.ticksValue = value
		return this
	}

	public domain(value: boolean | undefined): AxisBuilder {
		this.domainValue = value
		return this
	}

	public domainWidth(value: number | undefined): AxisBuilder {
		this.domainWidthValue = value
		return this
	}

	public domainColor(value: string | undefined): AxisBuilder {
		this.domainColorValue = value
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
			ticks: this.ticksValue,
			domain: this.domainValue,
			domainWidth: this.domainWidthValue || 1,
			domainColor: this.domainColorValue || 'black',
		}
	}
}
