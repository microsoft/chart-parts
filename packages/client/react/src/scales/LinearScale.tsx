import { scaleLinear } from 'd3-scale'
import { BaseScale, BaseScaleProps } from './BaseScale'
import { extent } from 'd3-array'

export class LinearScale extends BaseScale<
	number,
	number,
	BaseScaleProps<number, number>
> {
	protected processDomainValues(domain: number[]) {
		return extent(domain)
	}

	protected createScale(domain: [number, number], range: [number, number]) {
		return scaleLinear()
			.domain(domain)
			.range(range)
	}
}
