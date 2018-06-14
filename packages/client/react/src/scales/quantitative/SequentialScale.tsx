import { scaleSequential } from 'd3-scale'
import { DomainScale, DomainScaleProps } from '../DomainScale'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export interface ScaleSequentialProps
	extends DomainScaleProps<QuantitativeSpan> {
	interpolator: (t: QuantitativeValue) => any

	clamp?: boolean
}

export class SequantialScale extends DomainScale<
	ScaleSequentialProps,
	QuantitativeSpan
> {
	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const result = scaleSequential(this.props.interpolator).domain(domain)

		if (this.props.clamp !== undefined) {
			result.clamp(this.props.clamp)
		}
		return result
	}
}
