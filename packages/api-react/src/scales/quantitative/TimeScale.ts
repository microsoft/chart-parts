/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-empty-interface */
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'
import { time } from '@chart-parts/scales'

/**
 * TimeScale Component Props
 * @category Scale
 */
export interface TimeScaleProps
	extends QuantitativeScaleProps<TimeValue, number> {}

/**
 * TimeScale Component
 * @category Scale
 * @remark Based on [d3.scaleTime](https://github.com/d3/d3-scale#scaleTime)
 */
export const TimeScale = createQuantitativeScale<
	TimeScaleProps,
	TimeValue,
	number
>(
	'TimeScale',
	({ name, domain, range, zero, clamp, nice, reverse, padding }) =>
		time(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.padding(padding),
	['name', 'domain', 'range', 'zero', 'clamp', 'nice', 'reverse', 'padding'],
)
