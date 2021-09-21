/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ChannelHandler,
	FontWeight,
	MarkEncoding,
} from '@chart-parts/interfaces'
import { ChartPadding } from '@chart-parts/react'
import { MouseEvent } from 'react'

export interface Data {
	key: string | number
	value: number
}

export interface DataProp {
	key: string | number
	value: number
}

export interface CategoryData extends DataProp {
	[x: string]: any
}

export interface ProcessedCategoryData extends CategoryData {
	_position?: number
	_category?: string
}

export interface ProcessedBarData extends DataProp {
	_key: string | number
	_value: string | number
	_orientation: Orientation
}

export interface FillMarkProps {
	onMouseEnter?: ChannelHandler<MouseEvent<any>>
	onMouseLeave?: ChannelHandler<MouseEvent<any>>
	onClick?: ChannelHandler<MouseEvent<any>>
	fill?: MarkEncoding<string>
	fillOpacity?: MarkEncoding<number>
	stroke?: MarkEncoding<string>
	strokeWidth?: MarkEncoding<number>
}

export interface BandScaleProps {
	/**
	 * The name of the band-width static scale
	 */
	// bandWidth?: string
	/**
	 * The outer and inner padding value
	 */
	padding?: number
	/**
	 * The outer and inner padding value
	 */
	paddingInner?: number
	/**
	 * The outer and inner padding value
	 */
	paddingOuter?: number
	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	align?: number
	/**
	 * If true, rounds numeric output values to integers. Helpful for snapping to the pixel grid.
	 */
	round?: boolean
}

export interface AxisProps {
	/**
	 * A name reference for a scale
	 */
	// scale?: string;
	/**
	 * The axis' orientation on the chart
	 */
	// orient?: AxisOrientation;
	/**
	 * The thickness of the axis in pixels.
	 * NOTE: Unfortunately we can't mesaure text dynamically in all situations.
	 */
	thickness?: number
	domain?: boolean
	domainWidth?: number
	domainColor?: string
	ticks?: boolean
	tickColor?: string
	tickCount?: number
	tickOffset?: number
	tickRound?: boolean
	tickSize?: number
	tickWidth?: number
	bandPosition?: number
	// values?: TickValue[];
	labels?: boolean
	labelFont?: string
	labelFontSize?: number
	labelColor?: string
	labelPadding?: number
	labelFontWeight?: FontWeight
	labelAngle?: number
	labelFormat?: string
}

export enum Orientation {
	horizontal = 'horizontal',
	vertical = 'vertical',
}

export interface CommonChartProps {
	data: Data[] | any
	height: number
	width: number
	title?: string
	description?: string
	chartPadding?: number | ChartPadding
}
