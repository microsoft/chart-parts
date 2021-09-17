/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	HorizontalAlignment,
	VerticalTextAlignment,
	TextDirection,
	SGTextItem,
	FontWeight,
} from '@chart-parts/interfaces'
import { Item } from './Item'

export class TextItem extends Item implements SGTextItem {
	public static ITEM_TYPE = MarkType.Text
	public readonly itemtype = TextItem.ITEM_TYPE

	public align?: HorizontalAlignment = HorizontalAlignment.Left
	public angle? = 0
	public baseline?: VerticalTextAlignment = VerticalTextAlignment.Alphabetic
	public dir?: TextDirection = TextDirection.LTR
	public dx?: number
	public dy?: number
	public ellipsis? = '...'
	public font?: string
	public fontSize?: number
	public fontWeight?: FontWeight
	public fontVariant?: string | number
	public fontStyle?: string
	public limit? = 0
	public radius? = 0
	public text?: string
	public theta?: number
}
