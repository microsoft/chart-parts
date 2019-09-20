/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGItem, MarkType } from '@chart-parts/interfaces'
import * as Elements from './elements'
import { createItemType } from './registry'
import { MarkBuilder } from './MarkBuilder'

/**
 *
 * @param markType The type of mark item to create
 * @param item The mark items to add
 */
export function createMark(markType: MarkType, items: SGItem[]) {
	items.forEach((item, index) => {
		if (item.itemtype !== markType) {
			throw new Error(
				`Mark type must match the type of it's child items. Mark ${markType}, child ${item.itemtype}@${index}`,
			)
		}
	})
	const result = new Elements.Mark()
	result.marktype = markType
	result.items = items as Elements.Item[]
	return result
}

export function createItem(
	itemType: MarkType,
	props: { [key: string]: any } = {},
): SGItem {
	return createItemType(itemType, props)
}

export function buildMark(markType: MarkType) {
	return new MarkBuilder(markType)
}
