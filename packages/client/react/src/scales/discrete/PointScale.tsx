import { point } from '@gog/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '@gog/mark-spec-interfaces'

export interface PointScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the Point-width static scale
	 */
	widthName: string

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	align?: number

	/**
	 * The outer and inner padding value
	 */
	padding?: number

	/**
	 * The outer padding value
	 */
	paddingOuter?: number
}

export class PointScale extends DomainRangeScale<
	PointScaleProps,
	string[],
	[number, number],
	Dimension
> {
	protected createScale() {
		return point()
			.name(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.bindDomain(this.props.bindDomain)
			.range(this.props.range)
			.bindRange(this.props.bindRange)
			.widthName(this.props.widthName)
			.align(this.props.align)
			.padding(this.props.padding)
			.paddingOuter(this.props.paddingOuter)
			.build()
	}
}
