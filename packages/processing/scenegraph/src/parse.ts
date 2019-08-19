/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark, SGNodeType } from '@chart-parts/interfaces'
import { Mark, Item, GroupItem } from './elements'
import { createItemType } from './registry'

const KNOWN_KEYS = [
	'marktype',
	'name',
	'role',
	'interactive',
	'clip',
	'items',
	'zindex',

	// layout
	'x',
	'y',
	'width',
	'height',
	'align',
	'baseline',

	// fill
	'fill',
	'fillOpacity',
	'opacity',

	// stroke
	'stroke',
	'strokeOpacity',
	'strokeWidth',
	'strokeCap',

	// stroke dash
	'strokeDash',
	'strokeDashOffset',

	// arc
	'startAngle',
	'endAngle',
	'innerRadius',
	'outerRadius',

	// arc, rect
	'cornerRadius',
	'padAngle',

	// area, line
	'interpolate',
	'tension',
	'orient',
	'defined',

	// image
	'url',

	// path
	'path',

	// rule
	'x2',
	'y2',

	// symbol
	'size',
	'shape',

	// text
	'text',
	'angle',
	'theta',
	'radius',
	'dx',
	'dy',

	// font
	'font',
	'fontSize',
	'fontWeight',
	'fontStyle',
	'fontVariant',
]

export function sceneToJSON(
	scene: Mark<any>,
	indent?: string | number | undefined,
) {
	return JSON.stringify(scene, KNOWN_KEYS, indent)
}

export function parseScene(json: string | object): SGMark<any> {
	const scene = typeof json === 'string' ? JSON.parse(json) : json
	return initializeMark(scene) as Mark<any>
}

/**
 * Unpack a raw scenegraph Mark node into the scenegraph object model
 * @param rawMark The raw mark object
 */
function initializeMark(rawMark: any): SGMark<any> {
	const { marktype, role } = rawMark

	// Construct the output mark
	const result = new Mark()
	result.marktype = marktype
	result.role = role
	result.items = (rawMark.items || []).map((rawItem: any) => {
		const parentType = marktype ? SGNodeType.Mark : SGNodeType.Item

		// Initialize the data for this child node
		const item: Item | Mark<any> =
			parentType === SGNodeType.Mark
				? initializeItem(marktype, rawItem)
				: initializeMark(rawItem)

		// Set parentage information
		item.parent = result
		item.parentType = parentType
		return item
	})
	if (Object.prototype.hasOwnProperty.call(rawMark, 'clip')) {
		result.clip = rawMark.clip
	}
	if (Object.prototype.hasOwnProperty.call(rawMark, 'interactive')) {
		result.interactive = rawMark.interactive
	}
	return result
}

/**
 * Unpack a raw scenegraph Item node into the scenegraph object model
 * @param marktype The mark type of the item
 * @param rawItem The raw item object
 */
function initializeItem(marktype: string, rawItem: any) {
	const result = createItemType(marktype, rawItem)

	// If this is a group item, populate the nested marks
	if (result.itemtype === GroupItem.ITEM_TYPE) {
		const group = result as GroupItem
		const items = (rawItem.items || []).map((item: any) => initializeMark(item))
		group.items = items
	}

	return result
}
