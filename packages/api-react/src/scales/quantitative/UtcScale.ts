/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { utc } from '@chart-parts/scales'
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'

/**
 * Utc Scale Component
 * @category Scale
 * @remark Based on [d3.scaleUtc](https://github.com/d3/d3-scale#scaleUtc)
 */
export const UtcScale = createQuantitativeScale<
	QuantitativeScaleProps<TimeValue, number>,
	TimeValue,
	number
>(
	'UtcScale',
	({ name, domain, range, zero, clamp, nice, reverse, padding }) =>
		utc(name)
			.name(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.padding(padding),
	['name', 'domain', 'range', 'zero', 'clamp', 'nice', 'reverse', 'padding'],
)
