import { scaleBand, ScaleBand } from 'd3-scale'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '../../interfaces'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

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
	protected addScale() {
		super.addScale()
		if (this.props.bandWidth) {
			this.api.addScale(
				this.props.bandWidth,
				this.props.table,
				({ scales }: CreateScaleArgs) => () => {
					const rootScale: ScaleBand<string> = scales[this.props.name] as any
					return rootScale.bandwidth()
				},
			)
		}
	}

	protected createScale(args: CreateScaleArgs) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)
		const result = scaleBand()
			.domain(domain.map(d => '' + d))
			.range(range)

		if (this.props.align) {
			result.align(this.props.align)
		}
		if (this.props.padding) {
			result.padding(this.props.padding)
		}
		if (this.props.paddingOuter) {
			result.paddingOuter(this.props.paddingOuter)
		}
		if (this.props.paddingInner) {
			result.paddingInner(this.props.paddingInner)
		}

		return result
	}

	protected handleRangeBind(
		args: CreateScaleArgs,
		rangeBind: Dimension,
	): [number, number] {
		if (rangeBind === Dimension.HEIGHT) {
			return [0, args.view.height]
		} else {
			return [0, args.view.width]
		}
	}
}
