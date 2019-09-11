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
	private domainValue = true
	private domainColorValue: string = DEFAULT_COLOR
	private domainWidthValue: number = DEFAULT_STROKE
	// #endregion

	// #region Tick Configuration Fields
	private ticksValue = true
	private tickColorValue: string = DEFAULT_COLOR
	private tickCountValue?: number
	private tickOffsetValue = 0
	private tickRoundValue = false
	private tickSizeValue: number = DEFAULT_TICK_SIZE
	private tickWidthValue: number = DEFAULT_STROKE
	private tickValues?: TickValue[]
	// #endregion

	// #region Label Configuration Fields
	private labelsValue = true
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
	public domain(value: boolean | undefined): AxisBuilder {
		this.domainValue = value == null ? true : value
		return this
	}

	public domainWidth(value: number | undefined): AxisBuilder {
		this.domainWidthValue = value == null ? DEFAULT_STROKE : value
		return this
	}

	public domainColor(value: string | undefined): AxisBuilder {
		this.domainColorValue = value == null ? DEFAULT_COLOR : value
		return this
	}
	// #endregion

	// #region Tick Configuration
	public ticks(value: boolean | undefined): AxisBuilder {
		this.ticksValue = value == null ? true : value
		return this
	}

	public tickColor(value: string | undefined): AxisBuilder {
		this.tickColorValue = value == null ? DEFAULT_COLOR : value
		return this
	}

	public tickCount(value: number | undefined): AxisBuilder {
		this.tickCountValue = value
		return this
	}

	public tickOffset(value: number | undefined): AxisBuilder {
		this.tickOffsetValue = value == null ? 0 : value
		return this
	}

	public tickRound(value: boolean | undefined): AxisBuilder {
		this.tickRoundValue = value == null ? false : value
		return this
	}

	public tickSize(value: number | undefined): AxisBuilder {
		this.tickSizeValue = value == null ? DEFAULT_TICK_SIZE : value
		return this
	}

	public tickWidth(value: number | undefined): AxisBuilder {
		this.tickWidthValue = value == null ? DEFAULT_STROKE : value
		return this
	}

	public bandPosition(value: number | undefined): AxisBuilder {
		this.bandPositionValue = value
		return this
	}

	public values(values: TickValue[] | undefined): AxisBuilder {
		this.tickValues = values
		return this
	}

	// #endregion

	// #region Labels Configuration
	public labels(value: boolean | undefined): AxisBuilder {
		this.labelsValue = value == null ? true : value
		return this
	}

	public labelFont(value: string | undefined): AxisBuilder {
		this.labelFontValue = value == null ? DEFAULT_FONT : value
		return this
	}

	public labelFontSize(value: number | undefined): AxisBuilder {
		this.labelFontSizeValue = value == null ? DEFAULT_FONT_SIZE : value
		return this
	}

	public labelColor(value: string | undefined): AxisBuilder {
		this.labelColorValue = value == null ? DEFAULT_TEXT_COLOR : value
		return this
	}

	public labelPadding(value: number | undefined): AxisBuilder {
		this.labelPaddingValue = value == null ? DEFAULT_LABEL_PADDING : value
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
		this.thicknessValue = value == null ? DEFAULT_THICKNESS : value
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
