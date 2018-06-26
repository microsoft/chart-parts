import { scalePoint, ScalePoint } from 'd3-scale'
import { DomainRangeScale, DomainRangeScaleProps } from '../DomainRangeScale'
import { Dimension } from '../../interfaces'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'

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
	protected addScale() {
		super.addScale()
		this.api.addScale(
			this.props.widthName,
			this.props.table,
			({ scales }) => () =>
				(scales[this.props.name] as ScalePoint<any>).bandwidth(),
		)
	}

	protected createScale(args: CreateScaleArgs) {
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

	protected handleRangeBind(
		args: CreateScaleArgs,
		rangeBind: Dimension,
	): [number, number] {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.view.height, 0]
		} else {
			return [0, args.view.width]
		}
	}
}
