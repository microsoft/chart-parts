/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Dimension } from '@chart-parts/interfaces'
import { band } from '@chart-parts/scales'
import {
	createDomainRangeScale,
	DomainRangeScaleProps,
} from '../DomainRangeScale'

/**
 * BandScale Component Props
 * @category Scale
 */
export interface BandScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the band-width static scale
	 */
	bandWidth?: string

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

/**
 * BandScale React component
 * @category Scale
 * @remarks Based on the [d3 bandScale](https://github.com/d3/d3-scale#band-scales)
 */
export const BandScale: React.FC<BandScaleProps> = createDomainRangeScale<
	BandScaleProps,
	string[],
	[number, number],
	Dimension
>(
	'BandScale',
	({
		bandWidth,
		name,
		domain,
		range,
		align,
		padding,
		paddingOuter,
		paddingInner,
		round,
		reverse,
	}) => {
		const bandWidthName = bandWidth || name + 'Width'
		return band(name, bandWidthName)
			.domain(domain)
			.range(range)
			.align(align)
			.padding(padding)
			.paddingOuter(paddingOuter)
			.paddingInner(paddingInner)
			.round(round)
			.reverse(reverse)
	},
	[
		'bandWidth',
		'name',
		'domain',
		'range',
		'align',
		'padding',
		'paddingOuter',
		'paddingInner',
		'round',
		'reverse',
	],
)
