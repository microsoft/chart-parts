import { sqrt } from '@chart-parts/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export class SqrtScale extends QuantitativeScale<
	QuantitativeScaleProps<QuantitativeValue, number>,
	QuantitativeValue,
	number
> {
	protected createScale() {
		return sqrt(this.props.name)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.reverse(this.props.reverse)
			.padding(this.props.padding)
	}
}
