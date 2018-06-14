import { scaleOrdinal } from 'd3-scale'
import { DomainScale, DomainScaleProps } from '../DomainScale'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { colorSchemeMap } from '../colorSchemeMap'
import { CategoricalColorScheme } from '../../interfaces'

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
	protected createScale(args: ScaleCreatorArgs<any>) {
		return scaleOrdinal(this.props.range)
			.domain(this.getDomain(args))
			.range(this.getRange())
	}

	protected getRange() {
		if (this.props.colorScheme) {
			return colorSchemeMap.get(this.props.colorScheme)
		} else if (this.props.range) {
			return this.props.range
		} else {
			throw new Error('Either colorScheme or domain must be set')
		}
	}
}
