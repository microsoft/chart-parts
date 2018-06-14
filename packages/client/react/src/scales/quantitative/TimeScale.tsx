import { scaleTime } from 'd3-scale'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

export interface TimeScaleProps
	extends QuantitativeScaleProps<TimeValue, number> {}

export class TimeScale extends QuantitativeScale<
	TimeScaleProps,
	TimeValue,
	number
> {
	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleTime()
			.domain(domain)
			.range(range)

		this.addCommonProperties(result)
		return result
	}
}
