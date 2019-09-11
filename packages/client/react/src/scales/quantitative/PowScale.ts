/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { pow } from '@chart-parts/scales'
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export interface PowScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	exponent?: number
}

export const PowScale = createQuantitativeScale<
	PowScaleProps,
	QuantitativeValue,
	number
>(({ name, domain, range, zero, clamp, nice, reverse, exponent, padding }) => {
	return pow(name)
		.domain(domain)
		.range(range)
		.zero(zero)
		.clamp(clamp)
		.nice(nice)
		.reverse(reverse)
		.exponent(exponent)
		.padding(padding)
})
