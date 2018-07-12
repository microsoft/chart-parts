import { sequential } from '@gog/scales'
import { DomainScale, DomainScaleProps } from '../DomainScale'
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
	protected createScale() {
		return sequential(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.clamp(this.props.clamp)
			.interpolator(this.props.interpolator)
			.build()
	}
}
