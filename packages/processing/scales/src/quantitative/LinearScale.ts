import { scaleLinear } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

export class LinearScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleLinear()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		return { [this.nameValue as string]: result }
	}
}
