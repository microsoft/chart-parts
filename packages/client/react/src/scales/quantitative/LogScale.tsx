import { scaleLog } from 'd3-scale'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

export class LogScale extends QuantitativeScale<
	QuantitativeScaleProps<QuantitativeValue, number>,
	QuantitativeValue,
	number
> {
	protected createScale(args: ScaleCreatorArgs<any>) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleLog()
			.domain(domain)
			.range(range)
		this.addCommonProperties(result)
		return result
	}
}
