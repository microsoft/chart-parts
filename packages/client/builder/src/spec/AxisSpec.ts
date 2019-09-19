/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Axis,
	TickValue,
	FontWeight,
	AxisOrientation,
} from '@chart-parts/interfaces'
import {
	DEFAULT_AXIS_THICKNESS,
	DEFAULT_AXIS_DOMAIN_VALUE,
	DEFAULT_AXIS_COLOR,
	DEFAULT_AXIS_STROKE,
	DEFAULT_AXIS_TICKS_VALUE,
	DEFAULT_AXIS_TICK_OFFSET_VALUE,
	DEFAULT_AXIS_TICK_ROUND_VALUE,
	DEFAULT_AXIS_TICK_SIZE,
	DEFAULT_AXIS_LABELS_VALUE,
	DEFAULT_AXIS_FONT,
	DEFAULT_AXIS_FONT_SIZE,
	DEFAULT_AXIS_TEXT_COLOR,
	DEFAULT_AXIS_LABEL_PADDING,
	DEFAULT_AXIS_BAND_POSITION,
} from './defaults'

/**
 * Axis Specification Object
 * @category Specification
 */
export class AxisSpec implements Axis {
	private _thickness: number = DEFAULT_AXIS_THICKNESS

	private _scale: string
	private _orient: AxisOrientation

	// #region Domain Configuration Fields
	private _domain: boolean = DEFAULT_AXIS_DOMAIN_VALUE
	private _domainColor: string = DEFAULT_AXIS_COLOR
	private _domainWidth: number = DEFAULT_AXIS_STROKE
	// #endregion

	// #region Tick Configuration Fields
	private _ticks = DEFAULT_AXIS_TICKS_VALUE
	private _tickColor: string = DEFAULT_AXIS_COLOR
	private _tickCount?: number
	private _tickOffset = DEFAULT_AXIS_TICK_OFFSET_VALUE
	private _tickRound = DEFAULT_AXIS_TICK_ROUND_VALUE
	private _tickSize: number = DEFAULT_AXIS_TICK_SIZE
	private _tickWidth: number = DEFAULT_AXIS_STROKE
	private _values?: TickValue[]
	// #endregion

	// #region Label Configuration Fields
	private _labels = DEFAULT_AXIS_LABELS_VALUE
	private _labelFont: string = DEFAULT_AXIS_FONT
	private _labelFontSize: number = DEFAULT_AXIS_FONT_SIZE
	private _labelColor: string = DEFAULT_AXIS_TEXT_COLOR
	private _labelPadding: number = DEFAULT_AXIS_LABEL_PADDING
	private _bandPosition: number = DEFAULT_AXIS_BAND_POSITION
	private _labelFontWeight?: FontWeight
	private _labelAlign?: string
	private _labelAngle?: number
	private _labelFormat?: string
	// #endregion

	public constructor(scale: string, orient: AxisOrientation) {
		this._scale = scale
		this._orient = orient
	}

	public get scale(): string {
		return this._scale
	}

	public set scale(value: string) {
		this._scale = value
	}

	public get orient(): AxisOrientation {
		return this._orient
	}

	public set orient(value: AxisOrientation) {
		this._orient = value
	}

	public get domain(): boolean | undefined {
		return this._domain
	}

	public set domain(value: boolean | undefined) {
		this._domain = value == null ? DEFAULT_AXIS_DOMAIN_VALUE : value
	}

	public get domainColor(): string | undefined {
		return this._domainColor
	}

	public set domainColor(value: string | undefined) {
		this._domainColor = value == null ? DEFAULT_AXIS_COLOR : value
	}

	public get domainWidth(): number | undefined {
		return this._domainWidth
	}

	public set domainWidth(value: number | undefined) {
		this._domainWidth = value == null ? DEFAULT_AXIS_STROKE : value
	}

	public get ticks(): boolean | undefined {
		return this._ticks
	}

	public set ticks(value: boolean | undefined) {
		this._ticks = value == null ? DEFAULT_AXIS_TICKS_VALUE : value
	}

	public get tickColor(): string | undefined {
		return this._tickColor
	}

	public set tickColor(value: string | undefined) {
		this._tickColor = value == null ? DEFAULT_AXIS_COLOR : value
	}

	public get tickCount(): number | undefined {
		return this._tickCount
	}

	public set tickCount(value: number | undefined) {
		this._tickCount = value
	}

	public get tickOffset(): number | undefined {
		return this._tickOffset
	}

	public set tickOffset(value: number | undefined) {
		this._tickOffset = value == null ? DEFAULT_AXIS_TICK_OFFSET_VALUE : value
	}

	public get tickRound(): boolean | undefined {
		return this._tickRound
	}

	public set tickRound(value: boolean | undefined) {
		this._tickRound = value == null ? DEFAULT_AXIS_TICK_ROUND_VALUE : value
	}

	public get tickSize(): number | undefined {
		return this._tickSize
	}

	public set tickSize(value: number | undefined) {
		this._tickSize = value == null ? DEFAULT_AXIS_TICK_SIZE : value
	}

	public get tickWidth(): number | undefined {
		return this._tickWidth
	}

	public set tickWidth(value: number | undefined) {
		this._tickWidth = value == null ? DEFAULT_AXIS_STROKE : value
	}

	public get values(): TickValue[] | undefined {
		return this._values
	}

	public set values(values: TickValue[] | undefined) {
		this._values = values
	}

	public get bandPosition(): number | undefined {
		return this._bandPosition
	}

	public set bandPosition(value: number | undefined) {
		this._bandPosition = value == null ? DEFAULT_AXIS_BAND_POSITION : value
	}

	public get labels(): boolean | undefined {
		return this._labels
	}

	public set labels(value: boolean | undefined) {
		this._labels = value == null ? DEFAULT_AXIS_LABELS_VALUE : value
	}

	public get labelAlign(): string | undefined {
		return this._labelAlign
	}

	public set labelAlign(value: string | undefined) {
		this._labelAlign = value
	}

	public get labelFont(): string | undefined {
		return this._labelFont
	}

	public set labelFont(value: string | undefined) {
		this._labelFont = value == null ? DEFAULT_AXIS_FONT : value
	}

	public get labelFontSize(): number | undefined {
		return this._labelFontSize
	}

	public set labelFontSize(value: number | undefined) {
		this._labelFontSize = value == null ? DEFAULT_AXIS_FONT_SIZE : value
	}

	public get labelColor(): string | undefined {
		return this._labelColor
	}

	public set labelColor(value: string | undefined) {
		this._labelColor = value == null ? DEFAULT_AXIS_TEXT_COLOR : value
	}

	public get labelPadding(): number | undefined {
		return this._labelPadding
	}

	public set labelPadding(value: number | undefined) {
		this._labelPadding = value == null ? DEFAULT_AXIS_LABEL_PADDING : value
	}

	public get labelFontWeight(): FontWeight | undefined {
		return this._labelFontWeight
	}

	public set labelFontWeight(value: FontWeight | undefined) {
		this._labelFontWeight = value
	}

	public get labelAngle(): number | undefined {
		return this._labelAngle
	}

	public set labelAngle(value: number | undefined) {
		this._labelAngle = value
	}

	public get labelFormat(): string | undefined {
		return this._labelFormat
	}

	public set labelFormat(value: string | undefined) {
		this._labelFormat = value
	}

	public get thickness() {
		return this._thickness
	}

	public set thickness(value: number | undefined) {
		this._thickness = value == null ? DEFAULT_AXIS_THICKNESS : value
	}
}
