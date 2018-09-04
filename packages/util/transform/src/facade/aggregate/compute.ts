import { FieldAccessor } from '../../interfaces'
import { AggregateOperation, AggregateComputeField } from './aggregate'

export interface AggregateComputeBuilder
	extends Partial<AggregateComputeField> {
	target(target: string): AggregateComputeBuilder
	from(
		operation: AggregateOperation,
		source: FieldAccessor,
	): AggregateComputeField
}

/**
 * Starts a basic builder for defining an Aggregate Compute operation.
 * This is mostly for sugar.
 * @param fieldName The name of the field to compute
 */
export class AggregateComputeBuilderImpl implements AggregateComputeBuilder {
	public op: AggregateOperation | undefined
	public field: FieldAccessor | undefined
	public as: string | undefined

	public target(as: string) {
		this.as = as
		return this
	}

	public from(
		operation: AggregateOperation,
		source: FieldAccessor,
	): AggregateComputeField {
		this.op = operation
		this.field = source
		return (this as any) as AggregateComputeField
	}
}

export function compute(targetField?: string): AggregateComputeBuilder {
	const result = new AggregateComputeBuilderImpl()
	if (targetField) {
		result.target(targetField)
	}
	return result
}
