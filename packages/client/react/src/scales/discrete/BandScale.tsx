import { band } from '@gog/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '@gog/mark-spec-interfaces'

export interface BandScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the band-width static scale
	 */
	bandWidth?: string

	/**
	 * The outer and inner padding value
	 */
	padding?: number

	/**
	 * The outer and inner padding value
	 */
	paddingInner?: number

	/**
	 * The outer and inner padding value
	 */
	paddingOuter?: number

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	align?: number
}

export class BandScale extends DomainRangeScale<
	BandScaleProps,
	string[],
	[number, number],
	Dimension
> {
	protected createScale() {
		return band()
			.name(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.bindDomain(this.props.bindDomain)
			.range(this.props.range)
			.bindRange(this.props.bindRange)
			.align(this.props.align)
			.bandwidth(this.props.bandWidth)
			.padding(this.props.padding)
			.paddingOuter(this.props.paddingOuter)
			.paddingInner(this.props.paddingInner)
			.build()
	}
}
