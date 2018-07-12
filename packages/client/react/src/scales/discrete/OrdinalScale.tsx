import { ordinal, CategoricalColorScheme } from '@gog/scales'
import { DomainScale, DomainScaleProps } from '../DomainScale'

export interface OrdinalScaleProps<RangeType>
	extends DomainScaleProps<string[]> {
	/**
	 * The range of values to map to
	 */
	range?: RangeType[]

	/**
	 * The color scheme to use as the target ordinal domain
	 */
	colorScheme?: CategoricalColorScheme
}

export class OrdinalScale<RangeType> extends DomainScale<
	OrdinalScaleProps<RangeType>,
	string[]
> {
	protected createScale() {
		return ordinal(this.props.name)
			.table(this.props.table)
			.domain(this.props.domain)
			.range(this.props.range)
			.colorScheme(this.props.colorScheme)
			.build()
	}
}
