/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleOrdinal } from 'd3-scale'
import { DomainScale } from '../DomainScale'
import { colorSchemeMap, CategoricalColorScheme } from '../colorSchemeMap'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'

export class OrdinalScale<RangeType> extends DomainScale<string[]> {
	private rangeValue?: RangeType[]
	private colorSchemeValue?: CategoricalColorScheme

	/**
	 * The range of values to map to
	 */
	public range(value?: RangeType[]): this {
		this.rangeValue = value
		return this
	}

	/**
	 * The color scheme to use as the target ordinal domain
	 */
	public colorScheme(value?: CategoricalColorScheme): this {
		this.colorSchemeValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange()
		const scale = (this.rangeValue
			? scaleOrdinal(this.rangeValue)
			: scaleOrdinal()
		)
			.domain(domain)
			.range(range)
		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		return { [this.nameValue]: scale }
	}

	protected getRange() {
		if (this.colorSchemeValue) {
			return colorSchemeMap.get(this.colorSchemeValue)
		} else if (this.rangeValue) {
			return this.rangeValue
		} else {
			throw new Error('either colorScheme or domain must be set')
		}
	}
}
