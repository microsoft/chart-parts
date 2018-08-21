import { scaleUtc } from 'd3-scale'
import { QuantitativeScale, TimeValue } from './QuantitativeScale'
import { CreateScaleArgs, Scales } from '@markable/interfaces'

function setType(result: any) {
	result.__scaletype__ = 'utc'
}

export class UtcScale extends QuantitativeScale<TimeValue, number> {
	protected createScale(args: CreateScaleArgs): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleUtc()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		setType(result)
		return { [this.nameValue as string]: result }
	}
}
