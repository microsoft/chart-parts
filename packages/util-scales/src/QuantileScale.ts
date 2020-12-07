/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleQuantile, scaleQuantile } from 'd3-scale'
import { DomainRangeScale } from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'
import { ScaleCreationContext } from '@chart-parts/interfaces'

export class QuantileScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<[DomainValue, DomainValue], RangeValue[], any> {
	public handleRangeBind(): any[] {
		throw new Error('cannot use range binding on Quantize scale')
	}

	public createScale(args: ScaleCreationContext) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)

		const scale: ScaleQuantile<RangeValue> = scaleQuantile()
			.domain(domain)
			.range(range as any) as ScaleQuantile<RangeValue>
		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		return {
			[this.nameValue]: scale,
		}
	}
}
