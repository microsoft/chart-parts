import { scalePow } from 'd3-scale'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

export interface PowScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	exponent?: number
}

export class PowScale extends QuantitativeScale<
	PowScaleProps,
	QuantitativeValue,
	number
> {
	protected createScale(args: ScaleCreatorArgs<any>) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scalePow()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)

		if (this.props.exponent !== undefined) {
			result.exponent(this.props.exponent)
		}

		return result
	}
}
