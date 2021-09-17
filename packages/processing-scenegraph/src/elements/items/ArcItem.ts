/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, SGArcItem } from '@chart-parts/interfaces'
import { Item } from './Item'

export class ArcItem extends Item implements SGArcItem {
	public static ITEM_TYPE = MarkType.Arc
	public readonly itemtype = ArcItem.ITEM_TYPE

	public startAngle?: number
	public endAngle?: number
	public padAngle?: number
	public innerRadius?: number
	public outerRadius?: number
	public cornerRadius? = 0
}
