import { scaleTime } from 'd3-scale'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	TimeValue,
} from './QuantitativeScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

export class TimeScale extends QuantitativeScale<
	QuantitativeScaleProps<TimeValue, number>,
	TimeValue,
	number
> {
	protected createScale(args: ScaleCreatorArgs<any>) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleTime()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		return result
	}
}
