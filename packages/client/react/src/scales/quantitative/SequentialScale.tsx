import { scaleSequential } from 'd3-scale'
import { DomainScale, DomainScaleProps } from '../BaseScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { QuantitativeValue, QuantitativeSpan } from './QuantitativeScale'

export interface ScaleSequentialProps<Output>
	extends DomainScaleProps<QuantitativeSpan> {
	interpolator: (t: QuantitativeValue) => Output
}

export class SequantialScale extends DomainScale<
	ScaleSequentialProps<QuantitativeValue>,
	QuantitativeSpan
> {
	protected createScale(args: ScaleCreatorArgs<any>) {
		const domain = this.getDomain(args)
		return scaleSequential(this.interpolator).domain(domain)
	}

	protected get interpolator() {
		return this.props.interpolator
	}
}
