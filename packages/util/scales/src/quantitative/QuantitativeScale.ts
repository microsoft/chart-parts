import { DomainRangeScale } from '../DomainRangeScale'
import { extent } from 'd3-array'
import { CreateScaleArgs, Dimension } from '@gog/interfaces'
import { getBoundRange } from '../getBoundRange'

export type TimeValue = QuantitativeValue | Date
export type QuantitativeValue = number | { valueOf(): number }
export type QuantitativeSpan = [QuantitativeValue, QuantitativeValue]

export abstract class QuantitativeScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<
	[DomainValue, DomainValue],
	[RangeValue, RangeValue],
	Dimension
> {
	protected defaultZero = false
	protected clampValue?: boolean
	protected niceValue?: boolean | number | string | object
	protected zeroValue?: boolean

	/**
	 * A boolean indicating if output values should be clamped to the range (default false).
	 * If clamping is disabled and the scale is passed a value outside the domain, the scale
	 *  may return a value outside the range through extrapolation. If clamping is enabled,
	 * the output value of the scale is always within the scale’s range.
	 */
	public clamp(value?: boolean) {
		this.clampValue = value
		return this
	}

	/**
	 * Extends the domain so that it starts and ends on nice round values.
	 */
	public nice(value?: boolean | number | string | object) {
		this.niceValue = value
		return this
	}

	/**
	 * Boolean flag indicating if the scale domain should include zero.
	 * The default value is true for linear, sqrt and pow, and false otherwise.
	 */

	public zero(value?: boolean) {
		this.zeroValue = value
		return this
	}

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

	protected getZero() {
		return this.zeroValue || this.defaultZero
	}

	protected handleRangeBind(
		args: CreateScaleArgs,
		rangeBind: Dimension,
	): [RangeValue, RangeValue] {
		return getBoundRange(args, rangeBind) as [RangeValue, RangeValue]
	}

	protected addCommonProperties(scale: any) {
		if (this.niceValue === true) {
			scale.nice()
		} else if (this.niceValue !== undefined) {
			scale.nice(this.niceValue)
		}

		if (this.clampValue !== undefined) {
			scale.clamp(this.clampValue)
		}
	}
}
