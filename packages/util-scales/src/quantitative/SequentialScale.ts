/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext, Scales, Scale } from '@chart-parts/interfaces'
import { scaleSequential } from 'd3-scale'
import { DomainScale } from '../DomainScale'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export class SequantialScale extends DomainScale<QuantitativeSpan> {
	private clampValue?: boolean
	private interpolatorValue?: (t: QuantitativeValue) => any

	public interpolator(value?: (t: QuantitativeValue) => any): this {
		this.interpolatorValue = value
		return this
	}

	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	public clamp(value?: boolean): this {
		this.clampValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		if (!this.interpolatorValue) {
			throw new Error('interpolator must be set')
		}

		const domain = this.getDomain(args)
		const result = scaleSequential(this.interpolatorValue).domain(domain)

		if (this.clampValue !== undefined) {
			result.clamp(this.clampValue)
		}
		if (!this.nameValue) {
			throw new Error('scale name must be set')
		}
		return {
			[this.nameValue]: result as Scale<QuantitativeValue, any>,
		} as any as Scales
	}
}
