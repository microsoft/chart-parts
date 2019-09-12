/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext } from '@chart-parts/interfaces'
import { scaleQuantize, ScaleQuantize } from 'd3-scale'
import { extent } from 'd3-array'
import { DomainRangeScale } from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'
import { optionalArgument } from './util'

export class QuantizeScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<[DomainValue, DomainValue], RangeValue[], {}> {
	protected niceValue?: number | boolean
	protected zeroValue?: boolean

	public handleRangeBind(): any[] {
		throw new Error('cannot use range binding on Quantize scale')
	}

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	public nice(value?: number | boolean) {
		this.niceValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */

	public zero(value?: boolean) {
		this.zeroValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	public createScale(args: ScaleCreationContext) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)

		const scale: ScaleQuantize<RangeValue> = scaleQuantize()
			.domain(domain)
			.range(range as any) as ScaleQuantize<RangeValue>

		this.applyNice(scale)

		return {
			[this.nameValue!]: scale,
		}
	}

	protected processDomainValues(
		values: QuantitativeValue[],
	): [DomainValue, DomainValue] {
		const result = extent(values as any[]) as [DomainValue, DomainValue]

		if (this.zeroValue && !this.domainContainsZero(result)) {
			const [min, max] = result
			const zero = 0 as DomainValue
			return 0 < min ? [zero, max] : [min, zero]
		}
		return result
	}

	protected domainContainsZero(domain: [DomainValue, DomainValue]) {
		return 0 >= domain[0] && 0 <= domain[1]
	}

	private applyNice(scale: ScaleQuantize<RangeValue>) {
		const v = this.niceValue
		if (v != null) {
			if (v === true) {
				scale.nice()
			} else if (typeof v === 'number') {
				scale.nice(v)
			}
		}
	}
}
