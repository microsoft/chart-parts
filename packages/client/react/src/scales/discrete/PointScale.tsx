import { Dimension } from '@markable/interfaces'
import { point } from '@markable/scales'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'

export interface PointScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the Point-width static scale
	 */
	stepName?: string

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
		const stepName = this.props.stepName || this.props.name + 'Step'
		return point(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.stepName(stepName)
			.align(this.props.align)
			.padding(this.props.padding)
			.reverse(this.props.reverse)
			.build()
	}
}
