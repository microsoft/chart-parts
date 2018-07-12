import { linear } from '@gog/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export class LinearScale extends QuantitativeScale<
	QuantitativeScaleProps<QuantitativeValue, number>,
	QuantitativeValue,
	number
> {
	protected createScale() {
		return linear(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.padding(this.props.padding)
			.reverse(this.isReversed)
			.build()
	}
}
