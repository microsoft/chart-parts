/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Item } from './Item'
import { MarkType, Interpolation, SGLineItem } from '@chart-parts/interfaces'

export class LineItem extends Item implements SGLineItem {
	public static ITEM_TYPE = MarkType.Line
	public readonly itemtype = LineItem.ITEM_TYPE

	public interpolate?: Interpolation = Interpolation.Linear
	public tension?: number
	public defined?: boolean
}
