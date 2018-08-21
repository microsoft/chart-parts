// tslint:disable max-classes-per-file no-var-requires no-submodule-imports
import { CreateScaleArgs } from '@markable/interfaces'
import { DomainScale } from './DomainScale'

declare var require: any
const reverse = require('lodash/reverse')

export abstract class DomainRangeScale<
	Domain,
	Range,
	RangeBind
> extends DomainScale<Domain> {
	protected bindRangeValue?: RangeBind
	protected rangeValue?: (args: CreateScaleArgs) => Range
	protected reverseValue?: boolean

	public range(arg?: RangeBind | ((args: CreateScaleArgs) => Range) | Range) {
		if (typeof arg === 'function') {
			this.rangeValue = arg
		} else if (Array.isArray(arg)) {
			this.rangeValue = () => arg as Range
		} else if (typeof arg !== undefined) {
			this.bindRangeValue = arg as RangeBind
		} else {
			this.rangeValue = undefined
			this.bindRangeValue = undefined
		}
		return this
	}

	public reverse(reversed?: boolean) {
		this.reverseValue = reversed === undefined ? true : reversed
		return this
	}
	protected abstract handleRangeBind(
		args: CreateScaleArgs,
		bind: RangeBind,
	): Range

	protected getRange(args: CreateScaleArgs): Range {
		const range = this.determineRange(args)
		const result = this.reverseValue ? this.reverseRange(range) : range
		return result
	}

	protected reverseRange(range: Range): Range {
		const result: any = [...(range as any)]
		return reverse(result) as Range
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
