import {
	Axis,
	AxisOrientation,
	TickUnit,
	TickUnitInterval,
	TickValue,
} from '@gog/interfaces'

export class AxisBuilder {
	private scaleName: string | undefined
	private orientValue: AxisOrientation | undefined

	// #region Domain Configuration Fields
	private domainValue: boolean | undefined = true
	private domainColorValue: string | undefined
	private domainWidthValue: number | undefined
	// #endregion

	// #region Tick Configuration Fields
	private ticksValue: boolean | undefined = true
	private tickColorValue: string | undefined
	private tickCountValue: number | TickUnit | TickUnitInterval | undefined
	private tickOffsetValue: number | undefined
	private tickRoundValue: boolean | undefined
	private tickSizeValue: number | undefined
	private tickWidthValue: number | undefined
	private tickValues: TickValue[] | undefined
	// #endregion

	// #region General Axis Config
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
	// #endregion

	// #region Domain Configuration
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
	// #endregion

	// #region Tick Configuration
	public ticks(value: boolean | undefined): AxisBuilder {
		this.ticksValue = value
		return this
	}

	public tickColor(value: string | string): AxisBuilder {
		this.tickColorValue = value
		return this
	}

	public tickCount(
		value: number | TickUnit | TickUnitInterval | undefined,
	): AxisBuilder {
		this.tickCountValue = value
		return this
	}

	public tickOffset(value: number | undefined): AxisBuilder {
		this.tickOffsetValue = value
		return this
	}

	public tickRound(value: boolean | undefined): AxisBuilder {
		this.tickRoundValue = value
		return this
	}

	public tickSize(value: number | undefined): AxisBuilder {
		this.tickSizeValue = value
		return this
	}

	public tickWidth(value: number | undefined): AxisBuilder {
		this.tickWidthValue = value
		return this
	}

	public values(values: TickValue[]): AxisBuilder {
		this.tickValues = values
		return this
	}

	// #endregion

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
			domain: this.domainValue,
			domainWidth: this.domainWidthValue || 1,
			domainColor: this.domainColorValue || 'black',
			ticks: this.ticksValue,
			tickCount: this.tickCountValue,
			tickColor: this.tickColorValue,
			tickOffset: this.tickOffsetValue,
			tickRound: this.tickRoundValue,
			tickSize: this.tickSizeValue,
			tickWidth: this.tickWidthValue,
			values: this.tickValues,
		}
	}
}
