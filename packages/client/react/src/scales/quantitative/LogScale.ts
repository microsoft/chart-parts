/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { log } from '@chart-parts/scales'
import {
	createQuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export interface LogScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	base?: number
}

export const LogScale = createQuantitativeScale<
	LogScaleProps,
	QuantitativeValue,
	number
>(
	'LogScale',
	({ name, domain, range, zero, clamp, nice, reverse, base, padding }) =>
		log(name)
			.domain(domain)
			.range(range)
			.zero(zero)
			.clamp(clamp)
			.nice(nice)
			.reverse(reverse)
			.base(base)
			.padding(padding),
	[
		'name',
		'domain',
		'range',
		'zero',
		'clamp',
		'nice',
		'reverse',
		'base',
		'padding',
	],
)
