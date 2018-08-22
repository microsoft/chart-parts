// tslint:disable no-var-requires no-submodule-imports
import { FieldAccessor, Compare, Offset, createSorter } from '../interfaces'

function flatMap<T, K>(items: T[], lambda: ((input: T) => K[])): K[] {
	const mappedItems = items.map(lambda)
	return Array.prototype.concat.apply([], mappedItems)
}

interface DataStack extends Array<any> {
	/**
	 * The sum of values in the stack
	 */
	sum: number

	/**
	 * The max of values in the stack
	 */
	max: number
}
interface StackedDataSet extends Array<DataStack> {
	/**
	 * the maximum value found in the stacks
	 */
	max: number

	/**
	 * sum of values found in the stacks
	 */
	sum: number
}

export class StackTransform {
	private offsetVal: Offset = Offset.zero
	private outputFields: [string, string] = ['y0', 'y1']
	private fieldVal: FieldAccessor | undefined
	private groupByVal: FieldAccessor[] | undefined
	private sortVal: Compare[] | undefined

	/**
	 * The data field that determines the stack heights.
	 * @param field
	 */
	public field(field: FieldAccessor) {
		this.fieldVal = field
		return this
	}

	/**
	 * An array of fields by which to partition the data into separate stacks.
	 * @param groupBy
	 */
	public groupBy(...groupBy: FieldAccessor[]) {
		this.groupByVal = groupBy
		return this
	}

	/**
	 * Criteria for sorting values within each stack.
	 * @param sort
	 */
	public sort(...sort: Compare[]) {
		this.sortVal = sort
		return this
	}

	/**
	 * The baseline offset. One of “zero” (default), “center”, or “normalize”. The “center” offset will center the stacks. The “normalize” offset will compute percentage values for each stack point, with output values in the range [0,1].
	 * @param offset
	 */
	public offset(offset: Offset) {
		this.offsetVal = offset
		return this
	}

	/**
	 * The output fields for the computed start and end stack values. The default is ["y0", "y1"].
	 * @param outputFields
	 */
	public output(start: string, end: string) {
		this.outputFields = [start, end]
		return this
	}

	public transform(data: any[]): any[] {
		// Clone the data to keep this functional
		const innerData = [...data.map(d => ({ ...d }))]
		const rawGroups = this.partitionGroups(innerData)
		const groups = this.computeMaxesAndSums(rawGroups as StackedDataSet)
		this.processDataStacks(groups)
		return flatMap(groups, (t: DataStack) => t)
	}

	private get stacker() {
		switch (this.offsetVal) {
			case Offset.zero:
				return this.stackZero
			case Offset.center:
				return this.stackCenter
			case Offset.normalize:
				return this.stackNormalize
			default:
				throw new Error(`unknown offset: ${this.offsetVal}`)
		}
	}

	private partitionGroups(data: any[]): any[][] {
		const groupBy = this.groupByVal
		const groups: any = []

		if (groupBy === undefined) {
			// copy the given data table as the first group
			groups.push(data.slice())
		} else {
			// For each row in the table, assign it to its group
			const map = new Map<string, any[]>()
			for (const d of data) {
				const groupKey = groupBy.map(gb => gb(d)).join(',')
				if (!map.has(groupKey)) {
					const newGroup: any[] = []
					map.set(groupKey, newGroup)
					groups.push(newGroup)
				}
				const group = map.get(groupKey) as DataStack
				group.push(d)
			}
		}
		return groups
	}

	private computeMaxesAndSums(groups: StackedDataSet): StackedDataSet {
		const field = this.fieldVal as FieldAccessor
		const sorter = this.sortVal && createSorter(this.sortVal)
		let max = 0
		let sum = 0

		// compute sums of groups, sort groups as needed
		for (const group of groups) {
			let groupMax = 0
			let groupSum = 0

			for (const d of group) {
				const value = Math.abs(field(d))
				if (value > groupMax) {
					groupMax = value
				}
				groupSum += value
			}

			group.sum = groupSum
			group.max = groupMax

			if (groupSum > max) {
				max = groupSum
			}
			sum += groupSum
			if (sorter) {
				group.sort(sorter)
			}
		}

		groups.max = max
		groups.sum = sum
		return groups
	}

	private processDataStacks(groups: StackedDataSet) {
		const stacker = this.stacker
		groups.forEach(g => stacker(g, groups.max))
	}

	private stackCenter = (group: DataStack, max: number) => {
		const [y0, y1] = this.outputFields
		const field = this.fieldVal as FieldAccessor
		const sum = group.sum || 0

		let last = (max - sum) / 2
		for (const d of group) {
			const value = Math.abs(field(d))
			d[y0] = last
			d[y1] = last += value
		}
	}

	private stackNormalize = (group: DataStack) => {
		const [y0, y1] = this.outputFields
		const field = this.fieldVal as FieldAccessor
		const scale = 1 / group.sum

		let last = 0
		let v = 0
		for (const d of group) {
			const value = Math.abs(field(d))
			d[y0] = last
			d[y1] = last = scale * (v += value)
		}
	}

	private stackZero = (group: DataStack) => {
		const [y0, y1] = this.outputFields
		const field = this.fieldVal as FieldAccessor

		let lastPos = 0
		let lastNeg = 0
		for (const d of group) {
			const v = field(d)
			if (v < 0) {
				d[y0] = lastNeg
				d[y1] = lastNeg += v
			} else {
				d[y0] = lastPos
				d[y1] = lastPos += v
			}
		}
	}
}
