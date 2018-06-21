import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { extent } from 'd3-array'
import { Dimension } from '../../interfaces'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

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
> {
	protected defaultZero = false

	protected processDomainValues(
		values: QuantitativeValue[],
	): [DomainValue, DomainValue] {
		const result = extent(values as any[]) as [DomainValue, DomainValue]
		if (this.zero && !this.domainContainsZero(result)) {
			const [min, max] = result
			const zero = 0 as DomainValue
			return 0 < min ? [zero, max] : [min, zero]
		}
		return result
	}

	protected domainContainsZero(domain: [DomainValue, DomainValue]) {
		return 0 >= domain[0] && 0 <= domain[1]
	}

	protected get zero() {
		return this.props.zero || this.defaultZero
	}

	protected handleRangeBind(
		args: CreateScaleArgs,
		rangeBind: Dimension,
	): [RangeValue, RangeValue] {
		if (rangeBind === Dimension.HEIGHT) {
			return [
				args.drawRect.bottom as RangeValue,
				args.drawRect.top as RangeValue,
			]
		} else {
			return [
				args.drawRect.left as RangeValue,
				args.drawRect.right as RangeValue,
			]
		}
	}

	protected addCommonProperties(scale: any) {
		if (this.props.nice === true) {
			scale.nice()
		} else if (this.props.nice !== undefined) {
			scale.nice(this.props.nice)
		}

		if (this.props.clamp !== undefined) {
			scale.clamp(this.props.clamp)
		}
	}
}
