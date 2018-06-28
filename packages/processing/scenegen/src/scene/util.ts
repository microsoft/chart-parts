import { ItemSpace } from '@gog/util'
import {
	DataFrame,
	Mark as MarkSpec,
	MarkEncodings,
	ViewSize,
} from '@gog/interfaces'
import { createItem } from '@gog/scenegraph'
import { SceneFrame } from './SceneFrame'

export interface FacetPartitions {
	name: string
	partitions: any[][]
}

/**
 * Computes the draw-rectangle for a given group item's space and the parent draw space.
 *
 * It's important to note that these are a group's dimensions, because they will greedily
 * use parent space if their space has not been specified
 *
 * @param space The space measured for the group item
 * @param drawRect
 */
export function getNextDrawRect(space: ItemSpace, drawRect: ViewSize) {
	const right =
		space.origin.x !== undefined && space.shape.width !== undefined
			? space.origin.x + space.shape.width
			: drawRect.width

	const bottom =
		space.origin.y !== undefined && space.shape.height !== undefined
			? space.origin.y + space.shape.height
			: drawRect.height

	return {
		left: space.origin.x || 0,
		top: space.origin.y || 0,
		right,
		bottom,
	}
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
export function getBoundData(
	mark: MarkSpec,
	dataFrame: DataFrame,
): any[] | FacetPartitions {
	const { table, singleton, facet } = mark
	if (!singleton && !table) {
		throw new Error('marks that are non-singletons must be data-bound')
	}

	if (singleton) {
		return [{}]
	}

	const sourceTable = dataFrame[table as string]
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

/**
 * Creates a scenegraph item for a giver mark
 * @param mark The mark being used to specify the new item
 * @param row The data row bound to the mark
 * @param index The index of the data-row relative to its table
 * @param data The data table containing the row bound to the mark
 * @param channelNames The event-handling channel names to attach to this item
 * @param scales The current scale frame, required to encode item properties
 * @param dataFrame The current data frame, required to encode item properties
 */
export function createMarkItem(
	mark: MarkSpec,
	row: any,
	index: number,
	data: any[],
	frame: SceneFrame,
) {
	const { type, encodings, name, role } = mark
	return createItem(type, {
		...transferEncodings(row, index, data, encodings, frame),
		name,
		role,
		metadata: { index },
		channels: frame.channels,
	})
}

function transferEncodings(
	datum: any,
	index: number,
	data: any[],
	encodings: MarkEncodings,
	frame: SceneFrame,
) {
	const props: { [key: string]: any } = {}
	Object.keys(encodings)
		.filter(t => t !== 'items')
		.forEach(key => {
			const encoding = encodings[key]
			const dataContext = {
				datum,
				index,
				data,
				tables: frame.data,
			}
			const encodingValue = encoding(dataContext, frame.scales)
			props[key] = encodingValue
		})
	return props
}
