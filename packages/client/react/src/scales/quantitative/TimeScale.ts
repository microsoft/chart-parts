/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { time } from '@chart-parts/scales'
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'

export interface TimeScaleProps
	extends QuantitativeScaleProps<TimeValue, number> {}

export const TimeScale = createQuantitativeScale<
	TimeScaleProps,
	TimeValue,
	number
>(({ name, domain, range, zero, clamp, nice, reverse, padding }) => {
	return time(name)
		.domain(domain)
		.range(range)
		.zero(zero)
		.clamp(clamp)
		.nice(nice)
		.reverse(reverse)
		.padding(padding)
})
