/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { sequential } from '@chart-parts/scales'
import { createDomainScale, DomainScaleProps } from '../DomainScale'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export interface SequantialScaleProps
	extends DomainScaleProps<QuantitativeSpan> {
	interpolator: (t: QuantitativeValue) => any
	clamp?: boolean
}

export const SequentialScale = createDomainScale<
	SequantialScaleProps,
	QuantitativeSpan
>(({ name, domain, clamp, interpolator }) => {
	return sequential(name)
		.domain(domain)
		.clamp(clamp)
		.interpolator(interpolator)
})
