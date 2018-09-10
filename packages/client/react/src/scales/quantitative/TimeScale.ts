import { time } from '@markable/scales'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'

export interface TimeScaleProps
	extends QuantitativeScaleProps<TimeValue, number> {}

export class TimeScale extends QuantitativeScale<
	TimeScaleProps,
	TimeValue,
	number
> {
	protected createScale() {
		return time(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.reverse(this.props.reverse)
			.padding(this.props.padding)
			.build()
	}
}
