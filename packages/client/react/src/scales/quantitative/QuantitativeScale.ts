/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	DomainRangeScaleProps,
	createDomainRangeScale,
} from '../DomainRangeScale'
import { Dimension } from '@chart-parts/interfaces'

/**
 * A time-based scale value
 * @category Scale
 */
export type TimeValue = QuantitativeValue | Date

/**
 * A quantitative value
 * @category Scale
 */
export type QuantitativeValue = number | { valueOf(): number }

/**
 * A span of quantitative values
 * @category Scale
 */
export type QuantitativeSpan = [QuantitativeValue, QuantitativeValue]

/**
 * Quantitative Scale Component Props
 * @category Scale
 */
export interface QuantitativeScaleProps<DomainValue, RangeValue>
	extends DomainRangeScaleProps<
		[DomainValue, DomainValue],
		[RangeValue, RangeValue],
		Dimension
	> {
	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	clamp?: boolean

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	nice?: boolean | number | string | object

	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */
	zero?: boolean

	/**
	 * The number of pixels to pad the target range with
	 */
	padding?: number

	/**
	 * A flag that indicating whether to use range-rounding
	 */
	round?: boolean
}

/**
 * Quantitative scale foctory
 * @ignore
 * @param displayName The display name of the scale
 * @param createScale The scale creation function
 * @param propsToCheck Props to inspect for scale recreations
 */
export function createQuantitativeScale<
	Props extends QuantitativeScaleProps<DomainValue, RangeValue>,
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
>(
	displayName: string,
	createScale: (props: Props) => any,
	propsToCheck: string[] = [],
) {
	return createDomainRangeScale<
		Props,
		[DomainValue, DomainValue],
		[RangeValue, RangeValue],
		Dimension
	>(displayName, createScale, propsToCheck)
}
