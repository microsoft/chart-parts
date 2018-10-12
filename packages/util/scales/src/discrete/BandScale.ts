/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleBand } from 'd3-scale'
import { DomainRangeScale } from '../DomainRangeScale'
import {
	ScaleCreationContext,
	Dimension,
	Scales,
	Scale,
} from '@chart-parts/interfaces'
import { getBoundRange } from '../getBoundRange'

export interface BandScaleProps {
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
}

export class BandScale extends DomainRangeScale<
	string[],
	[number, number],
	Dimension
> {
	private paddingValue?: number
	private paddingInnerValue?: number
	private paddingOuterValue?: number
	private alignValue?: number
	private bandwidthValue?: string
	private roundValue?: boolean

	/**
	 * The name of the band-width static scale
	 */
	public bandwidthName(value?: string) {
		this.bandwidthValue = value
		return this
	}

	/**
	 * The outer and inner padding value
	 */
	public padding(value?: number) {
		this.paddingValue = value
		return this
	}

	/**
	 * The inner padding value
	 */
	public paddingInner(value?: number) {
		this.paddingInnerValue = value
		return this
	}

	/**
	 * The outer padding value
	 */
	public paddingOuter(value?: number) {
		this.paddingOuterValue = value
		return this
	}

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	public align(value?: number) {
		this.alignValue = value
		return this
	}

	public round(value?: boolean) {
		this.roundValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const bandscale = scaleBand()
			.domain(domain.map(d => '' + d))
			.range(range)

		if (this.alignValue) {
			bandscale.align(this.alignValue)
		}
		if (this.paddingValue) {
			bandscale.padding(this.paddingValue)
		}
		if (this.paddingOuterValue) {
			bandscale.paddingOuter(this.paddingOuterValue)
		}
		if (this.paddingInnerValue) {
			bandscale.paddingInner(this.paddingInnerValue)
		}
		if (this.roundValue) {
			bandscale.round(this.roundValue)
		}

		const result: Scales = { [this.nameValue!]: bandscale }
		if (this.bandwidthValue) {
			result[this.bandwidthValue as string] = bandscale.bandwidth as Scale<
				{},
				number
			>
		}
		return result
	}

	protected handleRangeBind(
		args: ScaleCreationContext,
		rangeBind: Dimension,
	): [number, number] {
		return getBoundRange(args, rangeBind)
	}
}
