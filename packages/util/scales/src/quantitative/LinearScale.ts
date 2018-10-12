/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleLinear } from 'd3-scale'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'

export class LinearScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const scale = scaleLinear()
			.domain(domain)
			.range(range)

		this.addCommonProperties(scale)

		return {
			[this.nameValue!]: scale,
		}
	}
}
