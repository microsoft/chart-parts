/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Item } from './Item'
import { MarkType, SGMark, SGGroupItem } from '@chart-parts/interfaces'

export class GroupItem extends Item implements SGGroupItem {
	public static ITEM_TYPE = MarkType.Group
	public readonly itemtype = GroupItem.ITEM_TYPE

	public clip?: boolean
	public cornerRadius? = 0
	public items: Array<SGMark<any>> = []
}
