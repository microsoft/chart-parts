/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext } from '@chart-parts/interfaces'
import { quantize } from '@chart-parts/scales'
import { DomainRangeScale, DomainRangeScaleProps } from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'

export interface QuantileScaleProps<DomainValue, RangeValue>
	extends DomainRangeScaleProps<[DomainValue, DomainValue], RangeValue[], {}> {}

export abstract class QuantileScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<
	QuantileScaleProps<DomainValue, RangeValue>,
	[DomainValue, DomainValue],
	RangeValue[],
	{}
> {
	protected handleRangeBind(
		args: ScaleCreationContext,
		rangeBind: {},
	): [RangeValue, RangeValue] {
		throw new Error('Range bind not supported in Quantize scale')
	}

	protected createScale() {
		return quantize(this.props.name)
			.domain(this.props.domain)
			.range(this.props.range)
			.reverse(this.props.reverse)
	}
}
