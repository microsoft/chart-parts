/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGRectItem, MarkType } from '@chart-parts/interfaces'
import { Item } from './Item'

export class RectItem extends Item implements SGRectItem {
	public static ITEM_TYPE = MarkType.Rect
	public readonly itemtype = RectItem.ITEM_TYPE

	public cornerRadius? = 0
}
