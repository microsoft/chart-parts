import { log } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { propToBool } from '../util'

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
			.zero(propToBool(this.props.zero))
			.clamp(propToBool(this.props.clamp))
			.nice(propToBool(this.props.nice))
			.reverse(propToBool(this.isReversed))
			.base(this.props.base)
			.padding(this.props.padding)
			.build()
	}
}
