// tslint:disable max-classes-per-file
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'
import { DomainScale } from './DomainScale'

export abstract class DomainRangeScale<
	Domain,
	Range,
	RangeBind
> extends DomainScale<Domain> {
	protected bindRangeValue?: RangeBind
	protected rangeValue?: (args: CreateScaleArgs) => Range

	public bindRange(value?: RangeBind) {
		this.bindRangeValue = value
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
