/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scaleSequential } from 'd3-scale'
import { DomainScale } from '../DomainScale'
import { ScaleCreationContext, Scales, Scale } from '@chart-parts/interfaces'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export class SequantialScale extends DomainScale<QuantitativeSpan> {
	private clampValue?: boolean
	private interpolatorValue?: (t: QuantitativeValue) => any

	public interpolator(value?: (t: QuantitativeValue) => any) {
		this.interpolatorValue = value
		return this
	}

	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	public clamp(value?: boolean) {
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
		return ({
			[this.nameValue!]: result as Scale<QuantitativeValue, {}>,
		} as any) as Scales
	}
}
