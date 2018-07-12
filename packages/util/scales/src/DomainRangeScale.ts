// tslint:disable max-classes-per-file
import { CreateScaleArgs } from '@gog/interfaces'
import { DomainScale } from './DomainScale'

export abstract class DomainRangeScale<
	Domain,
	Range,
	RangeBind
> extends DomainScale<Domain> {
	protected bindRangeValue?: RangeBind
	protected rangeValue?: (args: CreateScaleArgs) => Range
	protected reverseValue?: boolean

	public bindRange(value?: RangeBind) {
		this.bindRangeValue = value
		return this
	}

	public reverse(reversed?: boolean) {
		this.reverseValue = reversed === undefined ? true : reversed
		return this
	}

	public range(value?: (args: CreateScaleArgs) => Range) {
		this.rangeValue = value
		return this
	}

	protected abstract handleRangeBind(
		args: CreateScaleArgs,
		bind: RangeBind,
	): Range

	protected getRange(args: CreateScaleArgs): Range {
		const range = this.determineRange(args)
		return this.reverseValue ? this.reverseRange(range) : range
	}

	protected reverseRange(range: Range): Range {
		return (range as any).reverse() as Range
	}

	private determineRange(args: CreateScaleArgs): Range {
		if (this.rangeValue) {
			return this.rangeValue(args)
		} else {
			const bindRange = this.bindRangeValue
			if (!bindRange) {
				throw new Error('Either bindRange or range must be set')
			}
			return this.handleRangeBind(args, bindRange as RangeBind)
		}
	}
}
