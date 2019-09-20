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

/**
 * PowScale Component Props
 * @category Scale
 */
export interface PowScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	exponent?: number
}

/**
 * PowScale Component
 * @category Scale
 * @remarks Based on [d3.scalePow](https://github.com/d3/d3-scale#scalePow)
 */
export const PowScale = createQuantitativeScale<
	PowScaleProps,
	QuantitativeValue,
	number
>(
	'PowScale',
	({ name, domain, range, zero, clamp, nice, reverse, exponent, padding }) =>
		pow(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.exponent(exponent)
			.padding(padding),
	[
		'name',
		'domain',
		'range',
		'zero',
		'clamp',
		'nice',
		'reverse',
		'exponent',
		'padding',
	],
)
