/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	getItemSpace,
	Mark,
	ItemSpace,
	MarkEncodings,
	ViewSize,
	SGGroupItem,
	EncodingContext,
	ItemIdGenerator,
	Metadata,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { createItem } from '@chart-parts/scenegraph'
import { SceneFrame } from '../context/SceneFrame'
import { processNode } from '../processNode'

/**
 * Creates a scenegraph item bound to a data row
 *
 * @ignore
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
	const itemSpace = getItemSpace(item)
	const drawRect = getNextDrawRect(itemSpace, frame.view)
	const nextView = {
		width: drawRect.right - drawRect.left,
		height: drawRect.bottom - drawRect.top,
	}
	const itemFrame = frame.pushView(nextView).pushBoundDataItem(row)

	// Mash in the children and the bounds
	const items = mark.child ? processNode(mark.child, itemFrame) : []
	const groupItem: SGGroupItem = {
		...item,
		items,
		x: drawRect.left,
		y: drawRect.top,
		x2: drawRect.right,
		y2: drawRect.bottom,
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
	const { type, encodings, name, role, idGenerator } = mark
	const id = `${frame.parentId}.${getItemId(row, index, data, idGenerator)}`
	const context = getEncodingContext(id, row, index, frame)

	let metadata: Metadata = {} as any
	const metadataEncoding = mark.encodings[MarkEncodingKey.metadata]
	if (metadataEncoding) {
		metadata =
			typeof metadataEncoding === 'function'
				? metadataEncoding(context)
				: metadataEncoding
	}

	const props = {
		...transferEncodings(encodings, context),
		name,
		role,
		metadata: { index, id, ...metadata },
		channels: frame.channels,
	}
	return createItem(type, props)
}

function getItemId(
	row: any,
	index: number,
	data: any[],
	idGenerator: ItemIdGenerator | undefined,
) {
	if (!idGenerator) {
		return `${index}`
	} else {
		return idGenerator(row, index, data)
	}
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

function transferEncodings(encodings: MarkEncodings, context: EncodingContext) {
	const props: { [key: string]: any } = {}
	Object.keys(encodings)
		.filter(t => t !== 'items')
		.forEach(key => {
			const encoding = encodings[key]
			if (encoding) {
				const value =
					typeof encoding === 'function' ? encoding(context) : encoding
				props[key] = value
			}
		})
	return props
}

function getEncodingContext(
	id: string,
	d: any,
	index: number,
	frame: SceneFrame,
): EncodingContext {
	const encodingContext: EncodingContext = {
		id,
		d,
		index,
		view: frame.view,
		...frame.data,
		...frame.scales,
	}
	return encodingContext
}
