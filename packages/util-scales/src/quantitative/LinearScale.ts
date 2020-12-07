/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleLinear } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'

export class LinearScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const scale = scaleLinear().domain(domain).range(range)

		this.addCommonProperties(scale)
		if (!this.nameValue) {
			throw new Error('scale name must be set')
		}
		return {
			[this.nameValue]: scale,
		}
	}
}
