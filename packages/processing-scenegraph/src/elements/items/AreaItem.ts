/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	Orientation,
	Interpolation,
	SGAreaItem,
} from '@chart-parts/interfaces'
import { Item } from './Item'

export class AreaItem extends Item implements SGAreaItem {
	public static ITEM_TYPE = MarkType.Area
	public readonly itemtype = AreaItem.ITEM_TYPE

	public orient?: Orientation = Orientation.Vertical
	public interpolate: Interpolation = Interpolation.Linear
	public tension?: number
	public defined?: boolean
}
