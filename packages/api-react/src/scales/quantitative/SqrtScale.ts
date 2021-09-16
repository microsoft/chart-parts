/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { sqrt } from '@chart-parts/scales'
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

/**
 * Sqrt Scale Component
 * @category Scale
 * @remark Based on [d3.scaleSqrt](https://github.com/d3/d3-scale#scaleSqrt)
 */
export const SqrtScale = createQuantitativeScale<
	QuantitativeScaleProps<QuantitativeValue, number>,
	QuantitativeValue,
	number
>(
	'SqrtScale',
	({ name, domain, range, zero, clamp, nice, reverse, padding }) =>
		sqrt(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.padding(padding),
	['name', 'domain', 'range', 'zero', 'clamp', 'nice', 'reverse', 'padding'],
)
