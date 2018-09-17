import { ScaleCreationContext } from '@markable/interfaces'
import { ScaleQuantile, scaleQuantile } from 'd3-scale'
import { DomainRangeScale } from './DomainRangeScale'
import { QuantitativeValue } from './quantitative/QuantitativeScale'

export class QuantileScale<
	DomainValue extends QuantitativeValue,
	RangeValue extends QuantitativeValue
> extends DomainRangeScale<[DomainValue, DomainValue], RangeValue[], {}> {
	public handleRangeBind(args: ScaleCreationContext, rangeBind: {}): any[] {
		throw new Error('cannot use range binding on Quantize scale')
	}

	public createScale(args: ScaleCreationContext) {
		const domain = this.getDomain(args)
		const range = this.getRange(args)

		const scale: ScaleQuantile<RangeValue> = scaleQuantile()
			.domain(domain)
			.range(range as any) as ScaleQuantile<RangeValue>

		return {
			[this.nameValue!]: scale,
		}
	}
}
