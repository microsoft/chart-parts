import { scaleBand, ScaleBand } from 'd3-scale'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '../../interfaces'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

export interface BandScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the band-width static scale
	 */
	widthName: string

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
	public componentDidMount() {
		if (!this.api) {
			throw new Error('expected API to be present')
		}
		super.componentDidMount()
		this.api.addScaleCreator(this.props.widthName, ({ scales }) => () =>
			(scales[this.props.name] as ScaleBand<any>).bandwidth(),
		)
	}

	protected createScale(args: ScaleCreatorArgs<any>) {
		const result = scaleBand()
			.domain(this.getDomain(args))
			.range(this.getRange(args))

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
		args: ScaleCreatorArgs<any>,
		rangeBind: Dimension,
	): [number, number] {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.drawRect.bottom, args.drawRect.top]
		} else {
			return [args.drawRect.left, args.drawRect.right]
		}
	}
}
