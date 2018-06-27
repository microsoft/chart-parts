import { scaleTime } from 'd3-scale'
import { QuantitativeScale, TimeValue } from './QuantitativeScale'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

export class TimeScale extends QuantitativeScale<TimeValue, number> {
	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleTime()
			.domain(domain)
			.range(range)

		this.addCommonProperties(result)
		return { [this.nameValue as string]: result }
	}
}
