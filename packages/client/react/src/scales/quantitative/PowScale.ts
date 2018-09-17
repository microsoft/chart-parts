import { pow } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export interface PowScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	exponent?: number
}

export class PowScale extends QuantitativeScale<
	PowScaleProps,
	QuantitativeValue,
	number
> {
	protected createScale() {
		return pow(this.props.name)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.reverse(this.props.reverse)
			.exponent(this.props.exponent)
			.padding(this.props.padding)
	}
}
