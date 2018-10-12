/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { utc } from '@chart-parts/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'

export class UtcScale extends QuantitativeScale<
	QuantitativeScaleProps<TimeValue, number>,
	TimeValue,
	number
> {
	protected createScale() {
		return utc(this.props.name)
			.name(this.props.name)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.reverse(this.props.reverse)
			.padding(this.props.padding)
	}
}
