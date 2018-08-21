import {
	MarkType,
	getItemSpace,
	Mark,
	ItemSpace,
	MarkEncodings,
	ViewSize,
	SGGroupItem,
} from '@markable/interfaces'
import { createItem } from '@markable/scenegraph'
import { SceneFrame } from '../SceneFrame'
import { processNode } from '../processNode'

/**
 * Creates a scenegraph item bound to a data row
 *
 * @param frame The current scene frame
 * @param row The data row
 * @param index The data row index
 * @param table The data table
 */
export function createBoundItem(
	frame: SceneFrame,
	row: any,
	index: number,
	table: any[],
) {
	const mark = frame.mark as Mark

	const item = createItemFromMark(mark, row, index, table, frame)
	if (mark.type !== MarkType.Group) {
		return item
	}

	// Update the view and recompute scales
	const groupDrawRect = getNextDrawRect(getItemSpace(item), frame.view)
	const itemFrame = frame
		.pushView({
			width: groupDrawRect.right - groupDrawRect.left,
			height: groupDrawRect.bottom - groupDrawRect.top,
		})
		.pushBoundDataItem(row)

	// Mash in the children and the bounds
	const items = mark.child ? processNode(mark.child, itemFrame) : []
	const groupItem: SGGroupItem = {
		...item,
		items,
		x: groupDrawRect.left,
		y: groupDrawRect.top,
		x2: groupDrawRect.right,
		y2: groupDrawRect.bottom,
	}
	return groupItem
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
function createItemFromMark(
	mark: Mark,
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

/**
 * Computes the draw-rectangle for a group given its item-space and it's parent's draw space.
 *
 * It's important to note that these are a group's dimensions, because they will greedily
 * use parent space if their space has not been specified
 *
 * @param space The space measured for the group item
 * @param drawRect
 */
function getNextDrawRect(space: ItemSpace, viewSize: ViewSize) {
	const { width: availableWidth, height: availableHeight } = viewSize
	const {
		origin: { x = 0, y = 0 },
		shape: { width = availableWidth, height = availableHeight },
	} = space

	const top = y
	const left = x
	const right = left + width
	const bottom = top + height

	return {
		top,
		left,
		bottom,
		right,
	}
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
			const value = encoding(dataContext, frame.scales)
			props[key] = value
		})
	return props
}
