/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	SGMark,
	SGItem,
	SceneNode,
	MarkType,
	ItemSpace,
} from '@chart-parts/interfaces'
import { SceneFrame } from './context/SceneFrame'
import { processMark } from './marks/processMark'
import { buildAxes } from './axes'
import { buildMark } from '@chart-parts/scenegraph'

export type SGMarkAny = SGMark<SGItem>

/**
 * Processes a scene specification node into the SceneGraph model
 * @ignore
 * @param node The scene node to process
 * @param scaleFrame The scales available for the given scene node
 */
export function processNode(
	node: SceneNode,
	parentFrame: SceneFrame,
): SGMarkAny[] {
	// Push the new node, which registers channels and recomputes scales
	const frame = parentFrame.pushNode(node)

	// Build out the axes, which may or may not update the frame
	const { remainingSpace, axes } = buildAxes(node, frame)

	// Construct the items for the marks
	const viewFrame = frame.pushView(remainingSpace.shape as any)
	const markItems = node.marks.map(mark => processMark(mark, viewFrame))

	// Emit the result - if axes are present, wrap the marks in a group to put them in the correct space
	if (axes.length > 0) {
		return [...axes, createMarkGrouping(markItems, remainingSpace)]
	} else {
		return markItems
	}
}

function createMarkGrouping(items: Array<SGMark<SGItem>>, space: ItemSpace) {
	return buildMark(MarkType.Group)
		.role('marks')
		.items({
			...space.origin,
			...space.shape,
			items,
		})
		.build()
}
