import { scaleLog } from 'd3-scale'
import {
	QuantitativeScale,
	QuantitativeScaleProps,
	QuantitativeValue,
} from './QuantitativeScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

export interface LogScaleProps
	extends QuantitativeScaleProps<QuantitativeValue, number> {
	base?: number
}

export class LogScale extends QuantitativeScale<
	LogScaleProps,
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

		if (this.props.base !== undefined) {
			result.base(this.props.base)
		}
		return result
	}
}
