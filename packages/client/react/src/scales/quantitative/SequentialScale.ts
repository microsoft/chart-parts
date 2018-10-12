/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { sequential } from '@chart-parts/scales'
import { DomainScale, DomainScaleProps } from '../DomainScale'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export interface ScaleSequentialProps
	extends DomainScaleProps<QuantitativeSpan> {
	interpolator: (t: QuantitativeValue) => any
	clamp?: boolean
}

export class SequantialScale extends DomainScale<
	ScaleSequentialProps,
	QuantitativeSpan
> {
	protected createScale() {
		return sequential(this.props.name)
			.domain(this.props.domain)
			.clamp(this.props.clamp)
			.interpolator(this.props.interpolator)
	}
}
