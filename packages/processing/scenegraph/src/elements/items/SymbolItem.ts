/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, SymbolType, SGSymbolItem } from '@chart-parts/interfaces'
import { Item } from './Item'

export class SymbolItem extends Item implements SGSymbolItem {
	public static ITEM_TYPE = MarkType.Symbol
	public readonly itemtype = SymbolItem.ITEM_TYPE

	public size?: number
	public shape?: SymbolType | string = SymbolType.Circle
}
