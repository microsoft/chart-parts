import { scalePow } from 'd3-scale'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

export class PowScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	private exponentValue?: number

	public exponent(value?: number) {
		this.exponentValue = value
		return this
	}

	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scalePow()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)

		if (this.exponentValue !== undefined) {
			result.exponent(this.exponentValue)
		}

		return { [this.nameValue as string]: result }
	}
}
