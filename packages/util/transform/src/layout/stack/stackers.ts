import { getField } from '../../util'
import { FieldAccessor, Offset } from '../../interfaces'
import { StackBuilderContext } from './index'

export type Stacker = (
	context: StackBuilderContext,
	rows: any[],
	sum: number,
	max: number,
) => void

export function getStacker(context: StackBuilderContext): Stacker {
	switch (context.offset) {
		case Offset.zero:
			return stackZero
		case Offset.normalize:
			return stackNormalize
		case Offset.center:
			return stackCenter
		default:
			throw new Error('could not handle stack offset: ' + context.offset)
	}
}

const stackCenter = (
	context: StackBuilderContext,
	rows: any[],
	sum: number,
	max: number,
) => {
	const [y0, y1] = context.outputFields
	const field = context.field as FieldAccessor
	let last = (max - sum) / 2
	return rows.map(row => {
		const value = Math.abs(getField(row, field))
		return {
			...row,
			[y0]: last,
			[y1]: (last += value),
		}
	})
}

const stackNormalize = (
	context: StackBuilderContext,
	rows: any[],
	sum: number,
) => {
	const [y0, y1] = context.outputFields
	const field = context.field
	if (!field) {
		throw new Error('StackTransform: field must be defined')
	}
	const scale = 1 / sum

	let last = 0
	let v = 0
	return rows.map(d => {
		const value = Math.abs(getField(d, field))
		const y0Val = last
		const y1Val = (last = scale * (v += value))
		return { ...d, [y0]: y0Val, [y1]: y1Val }
	})
}

const stackZero = (context: StackBuilderContext, rows: any[]) => {
	const [y0, y1] = context.outputFields
	const field = context.field

	if (!field) {
		throw new Error('StackTransform: field must be defined')
	}

	let lastPos = 0
	let lastNeg = 0
	return rows.map(row => {
		const d = { ...row }
		const v = getField(d, field)
		if (v < 0) {
			d[y0] = lastNeg
			d[y1] = lastNeg += v
		} else {
			d[y0] = lastPos
			d[y1] = lastPos += v
		}
		return d
	})
}
