// tslint:disable max-classes-per-file no-var-requires no-submodule-imports
import { ScaleCreationContext } from '@markable/interfaces'
import { DomainScale } from './DomainScale'
import { optionalArgument } from './util'

declare var require: any
const reverse = require('lodash/reverse')

export abstract class DomainRangeScale<
	Domain,
	Range,
	RangeBind
> extends DomainScale<Domain> {
	protected bindRangeValue?: RangeBind
	protected rangeValue?: (args: ScaleCreationContext) => Range
	protected reverseValue?: boolean

	public range(
		arg?: RangeBind | ((args: ScaleCreationContext) => Range) | Range,
	) {
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
		this.reverseValue = optionalArgument(
			reversed,
			arguments.length,
			true,
			false,
		)
		return this
	}
	protected abstract handleRangeBind(
		args: ScaleCreationContext,
		bind: RangeBind,
	): Range

	protected getRange(args: ScaleCreationContext): Range {
		const range = this.determineRange(args)
		const result = this.reverseValue ? this.reverseRange(range) : range
		return result
	}

	protected reverseRange(range: Range): Range {
		const result: any = [...(range as any)]
		return reverse(result) as Range
	}

	private determineRange(args: ScaleCreationContext): Range {
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
