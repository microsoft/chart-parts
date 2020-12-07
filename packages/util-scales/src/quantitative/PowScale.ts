/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scalePow } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'

export class PowScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	private exponentValue?: number

	public exponent(value?: number): this {
		this.exponentValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scalePow().domain(domain).range(range)
		this.addCommonProperties(result)

		if (this.exponentValue !== undefined) {
			result.exponent(this.exponentValue)
		}
		if (!this.nameValue) {
			throw new Error('scale name must be set')
		}
		return { [this.nameValue]: result }
	}
}
