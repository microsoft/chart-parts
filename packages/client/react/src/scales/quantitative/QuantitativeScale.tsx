import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '@gog/interfaces'

export type TimeValue = QuantitativeValue | Date
export type QuantitativeValue = number | { valueOf(): number }
export type QuantitativeSpan = [QuantitativeValue, QuantitativeValue]

export interface QuantitativeScaleProps<DomainValue, RangeValue>
	extends DomainRangeScaleProps<
			[DomainValue, DomainValue],
			[RangeValue, RangeValue],
			Dimension
		> {
	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	clamp?: boolean

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	nice?: boolean | number | string | object

	/**
	 * 	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */
	zero?: boolean
}

export abstract class QuantitativeScale<
	Props extends QuantitativeScaleProps<DomainValue, RangeValue>,
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<
	Props,
	[DomainValue, DomainValue],
	[RangeValue, RangeValue],
	Dimension
> {}
