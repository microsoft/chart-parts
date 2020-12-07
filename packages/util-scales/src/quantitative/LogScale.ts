/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext, Scales } from '@chart-parts/interfaces'
import { scaleLog } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'

const POS_SENTINEL = 1e-6
const NEG_SENTINEL = -1e-6

export class LogScale extends QuantitativeScale<QuantitativeValue, number> {
	private baseValue?: number

	public base(value?: number): this {
		this.baseValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleLog().domain(domain).range(range)
		this.addCommonProperties(result)

		if (this.baseValue !== undefined) {
			result.base(this.baseValue)
		}
		if (!this.nameValue) {
			throw new Error('scale name must be set')
		}
		return { [this.nameValue]: result }
	}

	/**
	 * Use d3's default logscale domain as our default:
	 * https://github.com/d3/d3-scale#scaleLog
	 */
	protected get defaultDomain(): [QuantitativeValue, QuantitativeValue] {
		return [1, 10]
	}

	/**
	 * Ensure that the domain is fully positive or negative
	 * @param values The domain values
	 */
	protected processDomainValues(
		rawValues: any[],
	): [QuantitativeValue, QuantitativeValue] {
		const values = super.processDomainValues(rawValues)
		const isPositive = values[0] > 0 || values[1] > 0
		const isNegative = values[0] < 0 || values[1] < 0
		if (isPositive && isNegative) {
			throw new Error(
				'logscale domain values must both be either positive or negative',
			)
		}
		const zeroValue = isPositive ? POS_SENTINEL : NEG_SENTINEL

		return values.map(v => (v === 0 ? zeroValue : v)) as [
			QuantitativeValue,
			QuantitativeValue,
		]
	}
}
