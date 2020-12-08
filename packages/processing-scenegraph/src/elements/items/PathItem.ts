/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Item } from './Item'
import { MarkType, SGPathItem } from '@chart-parts/interfaces'

export class PathItem extends Item implements SGPathItem {
	public static ITEM_TYPE = MarkType.Path
	public readonly itemtype = PathItem.ITEM_TYPE

	public path?: string
}
