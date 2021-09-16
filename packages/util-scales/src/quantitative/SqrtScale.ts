/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'
import { scaleSqrt } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'

export class SqrtScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleSqrt().domain(domain).range(range)

		this.addCommonProperties(result)
		if (!this.nameValue) {
			throw new Error('scale name must be set')
		}
		return { [this.nameValue]: result }
	}
}
