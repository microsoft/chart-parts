/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Dimension } from '@chart-parts/interfaces'
import { band } from '@chart-parts/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'

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

export class BandScale extends DomainRangeScale<
	BandScaleProps,
	string[],
	[number, number],
	Dimension
> {
	protected createScale() {
		const bandWidthName = this.props.bandWidth || this.props.name + 'Width'
		return band(this.props.name, bandWidthName)
			.domain(this.props.domain)
			.range(this.props.range)
			.align(this.props.align)
			.padding(this.props.padding)
			.paddingOuter(this.props.paddingOuter)
			.paddingInner(this.props.paddingInner)
			.round(this.props.round)
			.reverse(this.props.reverse)
	}
}
