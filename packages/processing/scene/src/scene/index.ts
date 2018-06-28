// tslint:disable no-this-assignment no-submodule-imports no-var-requires
import {
	ChartOptions,
	SGMark,
	SGItem,
	SGGroupItem,
	MarkType,
	SceneNode,
	DataFrame,
	Channels,
	getItemSpace,
	MarkSpec,
	MarkEncodings,
	ViewSize,
	ItemSpace,
} from '@gog/interfaces'
import { createMark, createItem } from '@gog/scenegraph'
import { ChartOptionsManager } from './ChartOptionsManager'
import { SceneFrame } from './SceneFrame'

interface FacetPartitions {
	name: string
	partitions: any[][]
}

type SGMarkAny = SGMark<SGItem>

export interface ScenegraphResult {
	root: SGMark<SGItem>
	channelHandlers: Channels
}

/**
 * Builds a new scenegraph instance by binding data to a scene specification.
 *
 * @param data The data to bind with
 */
export function createScenegraph(
	root: SceneNode,
	data: DataFrame,
	options: ChartOptions,
): ScenegraphResult {
	const optionsManager = new ChartOptionsManager(options)
	const width = optionsManager.chartSpace.shape.width as number
	const height = optionsManager.chartSpace.shape.height as number
	const emptyNode = (undefined as any) as SceneNode
	const rootFrame = new SceneFrame(emptyNode, undefined, data, {
		width,
		height,
	})

	return {
		root: processNode(root, rootFrame)[0],
		channelHandlers: rootFrame.channelHandlers,
	}
}

/**
 * Processes a scene specification node into the SceneGraph model
 * @param node The scene node to process
 * @param scaleFrame The scales available for the given scene node
 */
function processNode(node: SceneNode, parentFrame: SceneFrame): SGMarkAny[] {
	const { marks } = node

	// Push the new node, which registers channels and recomputes scales
	const frame = parentFrame.pushNode(node)

	return marks.map(mark => {
		const markFrame = frame.pushMark(mark)
		/**
		 * If the data is a faceted group, then bind one group per facet.
		 */
		const boundData = getBoundData(mark, markFrame.data)
		const items = Array.isArray(boundData)
			? createItemPerDataRow(markFrame, boundData)
			: createItemPerFacet(markFrame, boundData)
		return createMark(mark.type, items)
	})
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
 * Creates a scenegraph item bound to a data row
 *
 * @param frame The current scene frame
 * @param row The data row
 * @param index The data row index
 * @param table The data table
 */
function createBoundItem(
	frame: SceneFrame,
	row: any,
	index: number,
	table: any[],
) {
	const mark = frame.mark as MarkSpec

	const item = createMarkItem(mark, row, index, table, frame)
	if (mark.type !== MarkType.Group) {
		return item
	}

	// Update the view and recompute scales
	const groupDrawRect = getNextDrawRect(getItemSpace(item), frame.view)
	const itemFrame = frame.pushView({
		width: groupDrawRect.right - groupDrawRect.left,
		height: groupDrawRect.bottom - groupDrawRect.top,
	})

	// Mash in the children and the bounds
	const groupItem: SGGroupItem = {
		...item,
		items: mark.child ? processNode(mark.child, itemFrame) : [],
		x: groupDrawRect.left,
		y: groupDrawRect.top,
		x2: groupDrawRect.right,
		y2: groupDrawRect.bottom,
	}
	return groupItem
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
function getNextDrawRect(space: ItemSpace, drawRect: ViewSize) {
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
function getBoundData(
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
function createMarkItem(
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
