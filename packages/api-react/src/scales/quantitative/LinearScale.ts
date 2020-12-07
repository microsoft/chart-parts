/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { linear } from '@chart-parts/scales'
import {
	QuantitativeScaleProps,
	QuantitativeValue,
	createQuantitativeScale,
} from './QuantitativeScale'

/**
 * Linear Scale Component
 * @category Scale
 */
export const LinearScale = createQuantitativeScale<
	QuantitativeScaleProps<QuantitativeValue, number>,
	QuantitativeValue,
	number
>(
	'LinearScale',
	({ name, range, domain, zero, clamp, nice, reverse, padding }) =>
		linear(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.padding(padding),
	['name', 'range', 'domain', 'zero', 'clamp', 'nice', 'reverse', 'padding'],
)
