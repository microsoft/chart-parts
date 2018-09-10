import { ScaleCreationContext } from '@markable/interfaces'
import { quantize } from '@markable/scales'
import { DomainRangeScale, DomainRangeScaleProps } from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'

export interface QuantizeScaleProps<DomainValue, RangeValue>
	extends DomainRangeScaleProps<[DomainValue, DomainValue], RangeValue[], {}> {
	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	nice?: boolean | number

	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */
	zero?: boolean
}

export abstract class QuantizeScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<
	QuantizeScaleProps<DomainValue, RangeValue>,
	[DomainValue, DomainValue],
	RangeValue[],
	{}
> {
	protected handleRangeBind(
		args: ScaleCreationContext,
		rangeBind: {},
	): [RangeValue, RangeValue] {
		throw new Error('Range bind not supported in Quantize scale')
	}

	protected createScale() {
		return quantize(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.reverse(this.props.reverse)
			.nice(this.props.nice)
			.zero(this.props.zero)
			.build()
	}
}
