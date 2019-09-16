/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { quantize } from '@chart-parts/scales'
import {
	createDomainRangeScale,
	DomainRangeScaleProps,
} from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'

export interface QuantileScaleProps<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScaleProps<[DomainValue, DomainValue], RangeValue[], {}> {}

export type QuantileScaleComponentType<
	D extends QuantitativeValue = any,
	R extends QuantitativeValue = any
> = React.FC<QuantileScaleProps<D, R>>

export const QuantileScale: QuantileScaleComponentType = createDomainRangeScale(
	'QuantileScale',
	({ name, domain, range, reverse }) =>
		quantize(name)
			.domain(domain)
			.range(range)
			.reverse(reverse),
	['name', 'domain', 'range', 'reverse'],
)
