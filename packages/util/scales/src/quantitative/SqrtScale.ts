/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleSqrt } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'

export class SqrtScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleSqrt()
			.domain(domain)
			.range(range)

		this.addCommonProperties(result)
		return { [this.nameValue!]: result }
	}
}
