import { pow } from '@gog/scales'
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
	protected defaultZero = true

	protected createScale() {
		return pow()
			.name(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.bindDomain(this.props.bindDomain)
			.range(this.props.range)
			.bindRange(this.props.bindRange)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.exponent(this.props.exponent)
			.build()
	}
}
