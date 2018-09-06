import { pow } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { propToBool } from '../util'

export interface PowScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	exponent?: number
}

export class PowScale extends QuantitativeScale<
	PowScaleProps,
	QuantitativeValue,
	number
> {
	protected defaultZero = true

	protected createScale() {
		return pow(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(propToBool(this.props.zero))
			.clamp(propToBool(this.props.clamp))
			.nice(propToBool(this.props.nice))
			.reverse(propToBool(this.isReversed))
			.exponent(this.props.exponent)
			.padding(this.props.padding)
			.build()
	}
}
