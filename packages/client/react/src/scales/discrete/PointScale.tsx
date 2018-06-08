import { scalePoint, ScalePoint } from 'd3-scale'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '../../interfaces'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'

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
	public componentDidMount() {
		super.componentDidMount()
		this.api.addScaleCreator(this.props.widthName, ({ scales }) => () =>
			(scales[this.props.name] as ScalePoint<any>).bandwidth(),
		)
	}

	protected createScale(args: ScaleCreatorArgs<any>) {
		const result = scalePoint()
			.domain(this.getDomain(args))
			.range(this.getRange(args))

		if (this.props.padding !== undefined) {
			result.padding(this.props.padding)
		}
		if (this.props.align !== undefined) {
			result.align(this.props.align)
		}

		return result
	}

	protected handleRangeBind(args: ScaleCreatorArgs<any>, rangeBind: Dimension) {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.drawRect.bottom, args.drawRect.top]
		} else {
			return [args.drawRect.left, args.drawRect.right]
		}
	}
}
