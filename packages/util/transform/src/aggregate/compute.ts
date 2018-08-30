import { FieldAccessor } from '../interfaces'
import { AggregateOperation, AggregateComputeField } from './interfaces'

/**
 * Starts a basic builder for defining an Aggregate Compute operation.
 * This is mostly for sugar.
 * @param fieldName The name of the field to compute
 */
export function compute(fieldName: string) {
	const context: Partial<AggregateComputeField> = {
		as: fieldName,
	}

	return {
		/**
		 * Describe the source
		 * @param field The source field
		 * @param operation The operation to perform
		 */
		from(operation: AggregateOperation, field?: FieldAccessor) {
			if (field) {
				context.field = field
			}
			context.op = operation
			return context as AggregateComputeField
		},
	}
}
