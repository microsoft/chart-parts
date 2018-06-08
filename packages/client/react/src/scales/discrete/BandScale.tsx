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
		super.componentDidMount()
		this.api.addScaleCreator(this.props.widthName, ({ scales }) => () =>
			(scales[this.props.name] as ScaleBand<any>).bandwidth(),
		)
	}

	protected createScale(args: ScaleCreatorArgs<any>) {
		return scaleBand()
			.padding(this.padding)
			.align(this.align)
			.domain(this.getDomain(args))
			.range(this.getRange(args))
	}

	protected handleRangeBind(args: ScaleCreatorArgs<any>, rangeBind: Dimension) {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.drawRect.bottom, args.drawRect.top]
		} else {
			return [args.drawRect.left, args.drawRect.right]
		}
	}

	protected get padding() {
		return this.props.padding || 0.01
	}

	protected get align() {
		return this.props.align || 0
	}
}
