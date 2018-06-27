// tslint:disable max-classes-per-file
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'
import { DomainScale, DomainScaleProps } from './DomainScale'

export interface DomainScaleProps<Domain> {
	/**
	 * The name of the scale
	 */
	name: string

	/**
	 * Binds the domain of the scale to a field in the
	 * data
	 */
	bindDomain?: string

	/**
	 * Manually create the domain based on a scale-creation
	 * context
	 */
	domain?: (args: CreateScaleArgs) => Domain
}

export interface DomainRangeScaleProps<Domain, Range, RangeBind>
	extends DomainScaleProps<Domain> {
	/**
	 * Binds the range of the scale to a chart dimension
	 * in the mark's draw-rect
	 */
	bindRange?: RangeBind

	/**
	 * Manually create the rangse based on a scale-creation
	 * context
	 */
	range?: (args: CreateScaleArgs) => Range
}
export abstract class DomainRangeScale<
	Props extends DomainRangeScaleProps<Domain, Range, RangeBind>,
	Domain,
	Range,
	RangeBind
> extends DomainScale<Props, Domain> {}
