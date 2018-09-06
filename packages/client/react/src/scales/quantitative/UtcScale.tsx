import { utc } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'
import { propToBool } from '../util'

export class UtcScale extends QuantitativeScale<
	QuantitativeScaleProps<TimeValue, number>,
	TimeValue,
	number
> {
	protected createScale() {
		return utc(this.props.name)
			.name(this.props.name)
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
