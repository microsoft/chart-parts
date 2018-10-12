/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleUtc } from 'd3-scale'
import { QuantitativeScale, TimeValue } from './QuantitativeScale'
import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'

function setType(result: any) {
	result.__scaletype__ = 'utc'
}

export class UtcScale extends QuantitativeScale<TimeValue, number> {
	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleUtc()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		setType(result)
		return { [this.nameValue!]: result }
	}
}
