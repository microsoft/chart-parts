// tslint:disable no-var-requires
import { FieldAccessor, Compare, Offset } from '../interfaces'
import { DatasetTransform } from './interfaces'
import { createSorter } from '../util'

declare var require: any
const { stack: vegaStack } = require('vega-encode')
const { field } = require('vega-util')

export interface StackBuilder extends DatasetTransform {
	groupBy(...fields: FieldAccessor[]): StackBuilder
	sort(compare: Compare): StackBuilder
	offset(offset: Offset): StackBuilder
	as(start: string, end: string): StackBuilder
}

export class StackBuilderImpl implements StackBuilder {
	private groupByFields: FieldAccessor[] | undefined
	private compareValue: Compare | undefined
	private offsetValue: Offset | undefined
	private asValue: [string, string] | undefined

	constructor(private stackField: string) {}

	public groupBy(...fields: FieldAccessor[]) {
		this.groupByFields = fields
		return this
	}

	public sort(compare: Compare) {
		this.compareValue = compare
		return this
	}

	public offset(offset: Offset) {
		this.offsetValue = offset
		return this
	}

	public as(start: string, end: string) {
		this.asValue = [start, end]
		return this
	}

	public build(df: any, from: any) {
		const spec: any = {
			field: field(this.stackField),
			offset: this.offsetValue,
			pulse: from,
		}
		if (this.groupByFields) {
			spec.groupby = this.groupByFields.map(c => field(c))
		}
		if (this.compareValue) {
			spec.sort = createSorter(this.compareValue)
		}
		if (this.asValue) {
			spec.as = this.asValue
		}

		const stackNode = df.add(vegaStack, spec)
		return stackNode
	}
}

export function stack(stackField: FieldAccessor): StackBuilder {
	return new StackBuilderImpl(stackField)
}
