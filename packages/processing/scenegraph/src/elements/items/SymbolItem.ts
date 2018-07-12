import { MarkType, SymbolType, SGSymbolItem } from '@gog/interfaces'
import { Item } from './Item'

export class SymbolItem extends Item implements SGSymbolItem {
	public static ITEM_TYPE = MarkType.Symbol
	public readonly itemtype: string = SymbolItem.ITEM_TYPE

	public size?: number
	public shape?: SymbolType | string = SymbolType.Circle
}
