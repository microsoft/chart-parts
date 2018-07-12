import { Dimension } from '@gog/interfaces'
import { point } from '@gog/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'

export interface PointScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the Point-width static scale
	 */
	stepName: string

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	align?: number

	/**
	 * The outer and inner padding value
	 */
	padding?: number
}

export class PointScale extends DomainRangeScale<
	PointScaleProps,
	string[],
	[number, number],
	Dimension
> {
	protected createScale() {
		return point(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.stepName(this.props.stepName)
			.align(this.props.align)
			.padding(this.props.padding)
			.reverse(this.isReversed)
			.build()
	}
}
