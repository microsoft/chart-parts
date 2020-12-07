/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { sequential } from '@chart-parts/scales'
import { createDomainScale, DomainScaleProps } from '../DomainScale'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

/**
 * Sequential Scale Component Props
 * @category Scale
 */
export interface SequantialScaleProps
	extends DomainScaleProps<QuantitativeSpan> {
	interpolator: (t: QuantitativeValue) => any
	clamp?: boolean
}

/**
 * Sequential Scale Component
 * @category Scale
 * @remark Based on [d3.scaleSequential](https://github.com/d3/d3-scale#sequential-scales)
 */
export const SequentialScale = createDomainScale<
	SequantialScaleProps,
	QuantitativeSpan
>(
	'SequentialScale',
	({ name, domain, clamp, interpolator }) =>
		sequential(name)
			.domain(domain)
			.clamp(clamp)
			.interpolator(interpolator),
	['name', 'domain', 'clamp', 'interpolator'],
)
