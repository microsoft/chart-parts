/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'
import { scalePow } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'

export class PowScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	private exponentValue?: number

	public exponent(value?: number) {
		this.exponentValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scalePow()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)

		if (this.exponentValue !== undefined) {
			result.exponent(this.exponentValue)
		}

		return { [this.nameValue!]: result }
	}
}
