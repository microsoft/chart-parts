import { time } from '@gog/scales'
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
		return time()
			.name(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.bindDomain(this.props.bindDomain)
			.range(this.props.range)
			.bindRange(this.props.bindRange)
			.zero(this.props.zero)
			.clamp(this.props.clamp)
			.nice(this.props.nice)
			.build()
	}
}
