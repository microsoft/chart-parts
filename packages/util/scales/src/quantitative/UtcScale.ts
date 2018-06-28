import { scaleUtc } from 'd3-scale'
import { QuantitativeScale, TimeValue } from './QuantitativeScale'
import { CreateScaleArgs } from '@gog/interfaces'

export class UtcScale extends QuantitativeScale<TimeValue, number> {
	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleUtc()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		return { [this.nameValue as string]: result }
	}
}
