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

export const DEFAULT_AXIS_COLOR = '#777'
export const DEFAULT_AXIS_TEXT_COLOR = '#000'
export const DEFAULT_AXIS_STROKE = 1
export const DEFAULT_AXIS_TICK_SIZE = 5
export const DEFAULT_AXIS_FONT_SIZE = 10
export const DEFAULT_AXIS_FONT = 'sans-serif'
export const DEFAULT_AXIS_LABEL_PADDING = 1
export const DEFAULT_AXIS_BAND_POSITION = 0.5
export const DEFAULT_AXIS_THICKNESS = 25
export const DEFAULT_AXIS_TICK_OFFSET_VALUE = 0
export const DEFAULT_AXIS_DOMAIN_VALUE = true
export const DEFAULT_AXIS_TICKS_VALUE = true
export const DEFAULT_AXIS_TICK_ROUND_VALUE = false
export const DEFAULT_AXIS_LABELS_VALUE = true

export class AxisBuilder {
	private thicknessValue: number = DEFAULT_AXIS_THICKNESS

	// #region Domain Configuration Fields
	private domainValue = DEFAULT_AXIS_DOMAIN_VALUE
	private domainColorValue: string = DEFAULT_AXIS_COLOR
	private domainWidthValue: number = DEFAULT_AXIS_STROKE
	// #endregion

	// #region Tick Configuration Fields
	private ticksValue = DEFAULT_AXIS_TICKS_VALUE
	private tickColorValue: string = DEFAULT_AXIS_COLOR
	private tickCountValue?: number
	private tickOffsetValue = DEFAULT_AXIS_TICK_OFFSET_VALUE
	private tickRoundValue = DEFAULT_AXIS_TICK_ROUND_VALUE
	private tickSizeValue: number = DEFAULT_AXIS_TICK_SIZE
	private tickWidthValue: number = DEFAULT_AXIS_STROKE
	private tickValues?: TickValue[]
	// #endregion

	// #region Label Configuration Fields
	private labelsValue = DEFAULT_AXIS_LABELS_VALUE
	private labelFontValue: string = DEFAULT_AXIS_FONT
	private labelFontSizeValue: number = DEFAULT_AXIS_FONT_SIZE
	private labelColorValue: string = DEFAULT_AXIS_TEXT_COLOR
	private labelPaddingValue: number = DEFAULT_AXIS_LABEL_PADDING
	private bandPositionValue: number = DEFAULT_AXIS_BAND_POSITION
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
	public domain(value: boolean | undefined): AxisBuilder {
		this.domainValue = value == null ? DEFAULT_AXIS_DOMAIN_VALUE : value
		return this
	}

	public domainWidth(value: number | undefined): AxisBuilder {
		this.domainWidthValue = value == null ? DEFAULT_AXIS_STROKE : value
		return this
	}

	public domainColor(value: string | undefined): AxisBuilder {
		this.domainColorValue = value == null ? DEFAULT_AXIS_COLOR : value
		return this
	}
	// #endregion

	// #region Tick Configuration
	public ticks(value: boolean | undefined): AxisBuilder {
		this.ticksValue = value == null ? DEFAULT_AXIS_TICKS_VALUE : value
		return this
	}

	public tickColor(value: string | undefined): AxisBuilder {
		this.tickColorValue = value == null ? DEFAULT_AXIS_COLOR : value
		return this
	}

	public tickCount(value: number | undefined): AxisBuilder {
		this.tickCountValue = value
		return this
	}

	public tickOffset(value: number | undefined): AxisBuilder {
		this.tickOffsetValue =
			value == null ? DEFAULT_AXIS_TICK_OFFSET_VALUE : value
		return this
	}

	public tickRound(value: boolean | undefined): AxisBuilder {
		this.tickRoundValue = value == null ? DEFAULT_AXIS_TICK_ROUND_VALUE : value
		return this
	}

	public tickSize(value: number | undefined): AxisBuilder {
		this.tickSizeValue = value == null ? DEFAULT_AXIS_TICK_SIZE : value
		return this
	}

	public tickWidth(value: number | undefined): AxisBuilder {
		this.tickWidthValue = value == null ? DEFAULT_AXIS_STROKE : value
		return this
	}

	public bandPosition(value: number | undefined): AxisBuilder {
		this.bandPositionValue = value == null ? DEFAULT_AXIS_BAND_POSITION : value
		return this
	}

	public values(values: TickValue[] | undefined): AxisBuilder {
		this.tickValues = values
		return this
	}

	// #endregion

	// #region Labels Configuration
	public labels(value: boolean | undefined): AxisBuilder {
		this.labelsValue = value == null ? DEFAULT_AXIS_LABELS_VALUE : value
		return this
	}

	public labelFont(value: string | undefined): AxisBuilder {
		this.labelFontValue = value == null ? DEFAULT_AXIS_FONT : value
		return this
	}

	public labelFontSize(value: number | undefined): AxisBuilder {
		this.labelFontSizeValue = value == null ? DEFAULT_AXIS_FONT_SIZE : value
		return this
	}

	public labelColor(value: string | undefined): AxisBuilder {
		this.labelColorValue = value == null ? DEFAULT_AXIS_TEXT_COLOR : value
		return this
	}

	public labelPadding(value: number | undefined): AxisBuilder {
		this.labelPaddingValue = value == null ? DEFAULT_AXIS_LABEL_PADDING : value
		return this
	}

	public labelFontWeight(value: FontWeight | undefined): AxisBuilder {
		this.labelFontWeightValue = value
		return this
	}

	public labelAngle(value: number | undefined): AxisBuilder {
		this.labelAngleValue = value
		return this
	}

	public labelFormat(value: string | undefined): AxisBuilder {
		this.labelFormatValue = value
		return this
	}

	public thickness(value: number | undefined): AxisBuilder {
		this.thicknessValue = value == null ? DEFAULT_AXIS_THICKNESS : value
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
