/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	Axis,
	AxisOrientation,
	TickValue,
	FontWeight,
} from '@chart-parts/interfaces'

const DEFAULT_COLOR = '#777'
const DEFAULT_TEXT_COLOR = '#000'
const DEFAULT_STROKE = 1
const DEFAULT_TICK_SIZE = 5
const DEFAULT_FONT_SIZE = 10
const DEFAULT_FONT = 'sans-serif'
const DEFAULT_LABEL_PADDING = 1
const DEFAULT_BAND_POSITION = 0.5
const DEFAULT_THICKNESS = 25

export class AxisBuilder {
	private thicknessValue: number = DEFAULT_THICKNESS

	// #region Domain Configuration Fields
	private domainValue: boolean = true
	private domainColorValue: string = DEFAULT_COLOR
	private domainWidthValue: number = DEFAULT_STROKE
	// #endregion

	// #region Tick Configuration Fields
	private ticksValue: boolean = true
	private tickColorValue: string = DEFAULT_COLOR
	private tickCountValue?: number
	private tickOffsetValue: number = 0
	private tickRoundValue: boolean = false
	private tickSizeValue: number = DEFAULT_TICK_SIZE
	private tickWidthValue: number = DEFAULT_STROKE
	private tickValues?: TickValue[]
	// #endregion

	// #region Label Configuration Fields
	private labelsValue: boolean = true
	private labelFontValue: string = DEFAULT_FONT
	private labelFontSizeValue: number = DEFAULT_FONT_SIZE
	private labelColorValue: string = DEFAULT_TEXT_COLOR
	private labelPaddingValue: number = DEFAULT_LABEL_PADDING
	private bandPositionValue?: number = DEFAULT_BAND_POSITION
	private labelFontWeightValue?: FontWeight
	private labelAlignValue?: string
	private labelAngleValue?: number
	private labelFormatValue?: string

	// #endregion

	public constructor(
		private scaleName: string,
		private orientValue: AxisOrientation,
	) {
		if (!this.scaleName) {
			throw new Error('scale name must be defined')
		}
		if (!this.orientValue) {
			throw new Error('axis orientation must be defined')
		}
	}

	// #region Domain Configuration
	public domain(value: boolean): AxisBuilder {
		this.domainValue = value
		return this
	}

	public domainWidth(value: number): AxisBuilder {
		this.domainWidthValue = value
		return this
	}

	public domainColor(value: string): AxisBuilder {
		this.domainColorValue = value
		return this
	}
	// #endregion

	// #region Tick Configuration
	public ticks(value: boolean): AxisBuilder {
		this.ticksValue = value
		return this
	}

	public tickColor(value: string): AxisBuilder {
		this.tickColorValue = value
		return this
	}

	public tickCount(value: number): AxisBuilder {
		this.tickCountValue = value
		return this
	}

	public tickOffset(value: number): AxisBuilder {
		this.tickOffsetValue = value
		return this
	}

	public tickRound(value: boolean): AxisBuilder {
		this.tickRoundValue = value
		return this
	}

	public tickSize(value: number): AxisBuilder {
		this.tickSizeValue = value
		return this
	}

	public tickWidth(value: number): AxisBuilder {
		this.tickWidthValue = value
		return this
	}

	public bandPosition(value: number): AxisBuilder {
		this.bandPositionValue = value
		return this
	}

	public values(values: TickValue[]): AxisBuilder {
		this.tickValues = values
		return this
	}

	// #endregion

	// #region Labels Configuration
	public labels(value: boolean): AxisBuilder {
		this.labelsValue = value
		return this
	}

	public labelFont(value: string): AxisBuilder {
		this.labelFontValue = value
		return this
	}

	public labelFontSize(value: number): AxisBuilder {
		this.labelFontSizeValue = value
		return this
	}

	public labelColor(value: string): AxisBuilder {
		this.labelColorValue = value
		return this
	}

	public labelPadding(value: number): AxisBuilder {
		this.labelPaddingValue = value
		return this
	}

	public labelFontWeight(value: FontWeight): AxisBuilder {
		this.labelFontWeightValue = value
		return this
	}

	public labelAngle(value: number): AxisBuilder {
		this.labelAngleValue = value
		return this
	}

	public labelFormat(value: string): AxisBuilder {
		this.labelFormatValue = value
		return this
	}

	public thickness(value: number): AxisBuilder {
		this.thicknessValue = value
		return this
	}

	// #endregion

	public build(): Axis {
		return {
			scale: this.scaleName,
			orient: this.orientValue,
			domain: this.domainValue,
			domainWidth: this.domainWidthValue,
			domainColor: this.domainColorValue,
			ticks: this.ticksValue,
			tickCount: this.tickCountValue,
			tickColor: this.tickColorValue,
			tickOffset: this.tickOffsetValue,
			tickRound: this.tickRoundValue,
			tickSize: this.tickSizeValue,
			tickWidth: this.tickWidthValue,
			values: this.tickValues,
			labels: this.labelsValue,
			labelFont: this.labelFontValue,
			labelFontSize: this.labelFontSizeValue,
			labelColor: this.labelColorValue,
			labelPadding: this.labelPaddingValue,
			labelAlign: this.labelAlignValue,
			labelFontWeight: this.labelFontWeightValue,
			bandPosition: this.bandPositionValue,
			labelAngle: this.labelAngleValue,
			labelFormat: this.labelFormatValue,
			thickness: this.thicknessValue,
		}
	}
}
