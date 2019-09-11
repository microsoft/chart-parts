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

export const UtcScale = createQuantitativeScale<
	QuantitativeScaleProps<TimeValue, number>,
	TimeValue,
	number
>(({ name, domain, range, zero, clamp, nice, reverse, padding }) => {
	return utc(name)
		.name(name)
		.domain(domain)
		.range(range)
		.zero(zero)
		.clamp(clamp)
		.nice(nice)
		.reverse(reverse)
		.padding(padding)
})
