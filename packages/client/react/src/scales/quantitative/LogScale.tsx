import { log } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'

export interface LogScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	base?: number
}

export class LogScale extends QuantitativeScale<
	LogScaleProps,
	QuantitativeValue,
	number
> {
	protected createScale() {
		return log(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.reverse(this.props.reverse)
			.base(this.props.base)
			.padding(this.props.padding)
			.build()
	}
}
