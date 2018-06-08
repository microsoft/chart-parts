import { scaleBand, ScaleBand } from 'd3-scale'
import { BaseScale, BaseScaleProps } from './BaseScale'

export interface BandScaleProps extends BaseScaleProps<string, number> {
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

export class BandScale extends BaseScale<string, number, BandScaleProps> {
	public componentDidMount() {
		super.componentDidMount()
		this.api.addScaleCreator(this.props.widthName, ({ scales }) => () =>
			(scales[this.props.name] as ScaleBand<any>).bandwidth(),
		)
	}

	protected createScale(domain: string[], range: [number, number]) {
		return scaleBand()
			.padding(this.getPadding())
			.align(this.getAlign())
			.domain(domain)
			.range(range)
	}

	protected getPadding() {
		return this.props.padding || 0.01
	}

	protected getAlign() {
		return this.props.align || 0
	}
}
