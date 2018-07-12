// tslint:disable max-classes-per-file
import { CreateScaleArgs } from '@gog/interfaces'
import { DomainScale, DomainScaleProps } from './DomainScale'

export interface DomainRangeScaleProps<Domain, Range, RangeBind>
	extends DomainScaleProps<Domain> {
	/**
	 * Sets the range of the scale.
	 *
	 * If an array is provided, it is treated as an explicit range value.
	 * If a function is proveded, it is treated as a factory function for generating the range.
	 * If any other value is provided, it is treated as a "range binder" and its behavior is
	 * dependent on the scale implementation.
	 */
	range?: RangeBind | ((args: CreateScaleArgs) => Range) | Range

	/**
	 * Reverse the range
	 */
	reverse?: boolean
}

export abstract class DomainRangeScale<
	Props extends DomainRangeScaleProps<Domain, Range, RangeBind>,
	Domain,
	Range,
	RangeBind
> extends DomainScale<Props, Domain> {
	protected get isReversed() {
		return this.props.reverse || false
	}
}
