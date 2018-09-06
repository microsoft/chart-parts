import { linear } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { propToBool } from '../util'

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
			.zero(propToBool(this.props.zero))
			.clamp(propToBool(this.props.clamp))
			.nice(propToBool(this.props.nice))
			.reverse(propToBool(this.isReversed))
			.padding(this.props.padding)
			.build()
	}
}
