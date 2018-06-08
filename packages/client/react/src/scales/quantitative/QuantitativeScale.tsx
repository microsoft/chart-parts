import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { extent } from 'd3-array'
import { Dimension } from '../../interfaces'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

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
}

export abstract class QuantitativeScale<
	Props extends QuantitativeScaleProps<DomainValue, RangeValue>,
	DomainValue,
	RangeValue
> extends DomainRangeScale<
	Props,
	[DomainValue, DomainValue],
	[RangeValue, RangeValue],
	Dimension
> {
	protected processDomainValues(values: QuantitativeValue[]) {
		return extent(values as any[])
	}

	protected handleRangeBind(args: ScaleCreatorArgs<any>, rangeBind: Dimension) {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.drawRect.bottom, args.drawRect.top]
		} else {
			return [args.drawRect.left, args.drawRect.right]
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
