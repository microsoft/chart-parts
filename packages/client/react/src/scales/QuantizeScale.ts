/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { quantize } from '@chart-parts/scales'
import {
	createDomainRangeScale,
	DomainRangeScaleProps,
} from './DomainRangeScale'

/**
 * Quantize Scale Component Props
 * @category Scale
 */
export interface QuantizeScaleProps<DomainValue, RangeValue>
	extends DomainRangeScaleProps<[DomainValue, DomainValue], RangeValue[], {}> {
	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	nice?: boolean | number

	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */
	zero?: boolean
}

/**
 * Quantize Scale Component Type
 * @category Scale
 */
export type QuantizeScaleComponentType<D = any, R = any> = React.FC<
	QuantizeScaleProps<D, R>
>

/**
 * Quantize Scale Component
 * @category Scale
 * @remarks Based on [d3.scaleQuantize](https://github.com/d3/d3-scale#scaleQuantize)
 */
export const QuantizeScale: QuantizeScaleComponentType = createDomainRangeScale(
	'QuantizeScale',
	({ name, domain, range, reverse, nice, zero }) =>
		quantize(name)
			.domain(domain)
			.range(range)
			.reverse(reverse)
			.nice(nice)
			.zero(zero),
	['name', 'domain', 'range', 'reverse', 'nice', 'zero'],
)
