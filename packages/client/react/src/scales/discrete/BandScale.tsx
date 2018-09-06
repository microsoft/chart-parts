import { Dimension } from '@markable/interfaces'
import { band } from '@markable/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { propToBool } from '../util'

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

	/**
	 * If true, rounds numeric output values to integers. Helpful for snapping to the pixel grid.
	 */
	round?: boolean
}

export class BandScale extends DomainRangeScale<
	BandScaleProps,
	string[],
	[number, number],
	Dimension
> {
	protected createScale() {
		const bandWidthName = this.props.bandWidth || this.props.name + 'Width'
		return band(this.props.name, bandWidthName)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.align(this.props.align)
			.padding(this.props.padding)
			.paddingOuter(this.props.paddingOuter)
			.paddingInner(this.props.paddingInner)
			.round(propToBool(this.props.round))
			.reverse(propToBool(this.isReversed))
			.build()
	}
}
