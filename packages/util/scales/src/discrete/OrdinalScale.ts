import { scaleOrdinal } from 'd3-scale'
import { ScaleCreationContext, Scales } from '@markable/interfaces'
import { DomainScale } from '../DomainScale'
import { colorSchemeMap, CategoricalColorScheme } from '../colorSchemeMap'

export class OrdinalScale<RangeType> extends DomainScale<string[]> {
	private rangeValue?: RangeType[]
	private colorSchemeValue?: CategoricalColorScheme

	/**
	 * The range of values to map to
	 */
	public range(value?: RangeType[]) {
		this.rangeValue = value
		return this
	}

	/**
	 * The color scheme to use as the target ordinal domain
	 */
	public colorScheme(value?: CategoricalColorScheme) {
		this.colorSchemeValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange()
		const scale = scaleOrdinal(this.rangeValue)
			.domain(domain)
			.range(range)
		return { [this.nameValue as string]: scale }
	}

	protected getRange() {
		if (this.colorSchemeValue) {
			return colorSchemeMap.get(this.colorSchemeValue)
		} else if (this.rangeValue) {
			return this.rangeValue
		} else {
			throw new Error('Either colorScheme or domain must be set')
		}
	}
}
