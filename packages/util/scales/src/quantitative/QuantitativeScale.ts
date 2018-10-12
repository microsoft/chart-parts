/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext, Dimension } from '@chart-parts/interfaces'
import { extent } from 'd3-array'
import { interpolateRound } from 'd3-interpolate'
import { DomainRangeScale } from '../DomainRangeScale'
import { getBoundRange } from '../getBoundRange'
import { optionalArgument } from '../util'
export type TimeValue = QuantitativeValue | Date
export type QuantitativeValue = number | { valueOf(): number }
export type QuantitativeSpan = [QuantitativeValue, QuantitativeValue]

export abstract class QuantitativeScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<
	[DomainValue, DomainValue],
	[RangeValue, RangeValue],
	Dimension
> {
	protected defaultZero = false
	protected clampValue?: boolean
	protected niceValue?: boolean | number | string | object
	protected zeroValue?: boolean
	protected paddingValue?: number
	protected roundValue?: boolean

	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	public clamp(value?: boolean) {
		this.clampValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	public nice(value?: boolean | number | string | object) {
		this.niceValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	public round(value?: boolean) {
		this.roundValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	/**
	 * Adjusts the range of the scale to account for a pixel-padding on each end.
	 * @param paddingValue The number of pixels to pad each end of the scale's range with.
	 */
	public padding(paddingValue?: number) {
		this.paddingValue = paddingValue
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

	protected getRange(args: ScaleCreationContext): [RangeValue, RangeValue] {
		const range = super.getRange(args)
		if (this.paddingValue !== undefined) {
			const [start, end]: any = range
			const pad = this.paddingValue
			const newStart = start > end ? start - pad : start + pad
			const newEnd = end > start ? end - pad : end + pad

			return [newStart, newEnd] as [RangeValue, RangeValue]
		} else {
			return range
		}
	}

	protected processDomainValues(
		values: QuantitativeValue[],
	): [DomainValue, DomainValue] {
		const result = extent(values as any[]) as [DomainValue, DomainValue]

		if (this.getZero() && !this.domainContainsZero(result)) {
			const [min, max] = result
			const zero = 0 as DomainValue
			return 0 < min ? [zero, max] : [min, zero]
		}
		return result
	}

	protected domainContainsZero(domain: [DomainValue, DomainValue]) {
		return 0 >= domain[0] && 0 <= domain[1]
	}

	protected getZero() {
		return this.zeroValue !== undefined ? this.zeroValue : this.defaultZero
	}

	protected handleRangeBind(
		args: ScaleCreationContext,
		rangeBind: Dimension,
	): [RangeValue, RangeValue] {
		return getBoundRange(args, rangeBind) as [RangeValue, RangeValue]
	}

	protected addCommonProperties(scale: any) {
		if (this.niceValue === true) {
			scale.nice()
		} else if (this.niceValue !== undefined) {
			scale.nice(this.niceValue)
		}
		if (this.clampValue !== undefined) {
			scale.clamp(this.clampValue)
		}
		if (this.roundValue === true) {
			scale.interpolate(interpolateRound)
		}
	}
}
