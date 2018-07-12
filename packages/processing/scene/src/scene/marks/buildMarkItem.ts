import { Mark } from '@gog/interfaces'
import { createMark } from '@gog/scenegraph'
import { SceneFrame } from '../SceneFrame'
import { createBoundItem } from './createBoundItem'

export interface FacetPartitions {
	name: string
	partitions: any[][]
}

export function buildMarkItem(mark: Mark, frame: SceneFrame) {
	const markFrame = frame.pushMark(mark)
	/**
	 * If the data is a faceted group, then bind one group per facet.
	 */
	const boundData = getBoundData(mark, markFrame)
	const items = Array.isArray(boundData)
		? createItemPerDataRow(markFrame, boundData)
		: createItemPerFacet(markFrame, boundData)
	return createMark(mark.type, items)
}

/**
 * Creates one scenegraph item per facet partition
 *
 * @param frame The current scene frame
 * @param partitions the item faceting configuration
 */
function createItemPerFacet(
	frame: SceneFrame,
	{ name, partitions }: FacetPartitions,
) {
	return partitions.map((partition, index) => {
		return createBoundItem(
			frame.pushData({ [name]: partition }),
			partition,
			index,
			partitions,
		)
	})
}

/**
 * Creates one sceengraph item per row in a data-table
 * @param frame The current scene frame
 * @param data The data table
 */
function createItemPerDataRow(frame: SceneFrame, data: any[]) {
	return data.map((row, index) => createBoundItem(frame, row, index, data))
}

/**
 * Gets the bound data for a mark.
 * * If the mark is a singleton, this will return an array with a single sentinel object.
 * * If the mark is not faceted, this will return the source table specified by the mark
 * * If the mark is faceted, this will return a partition set, with data for each facet partition.
 *
 * @param mark The mark to bind data to
 * @param dataFrame The current data-frame, which provides data-sets at this scope
 */
function getBoundData(mark: Mark, frame: SceneFrame): any[] | FacetPartitions {
	const { table, facet } = mark

	// If the table is unset, render as a singleton of the existing bound data-item
	if (!table) {
		return [frame.boundDataItem]
	}

	const sourceTable = frame.data[table as string]
	if (!facet) {
		return sourceTable || []
	}

	const { name, partitionOn } = facet
	const getFacetKey =
		typeof partitionOn === 'function' ? partitionOn : (d: any) => d[partitionOn]
	const partitionMap = new Map<string, any[]>()
	const partitions: any[][] = []

	sourceTable.forEach((row: any) => {
		const key = getFacetKey(row)
		if (!partitionMap.has(key)) {
			const newPartition: any[] = []
			partitions.push(newPartition)
			partitionMap.set(key, newPartition)
		}
		const partition = partitionMap.get(key) as any[]
		partition.push(row)
	})

	return { name, partitions }
}
