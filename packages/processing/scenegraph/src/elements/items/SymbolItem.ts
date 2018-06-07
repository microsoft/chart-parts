import { MarkType, SymbolType } from '@gog/mark-interfaces'
import { SGSymbolItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class SymbolItem extends Item implements SGSymbolItem {
	public static ITEM_TYPE = MarkType.Symbol
	public readonly itemtype: string = SymbolItem.ITEM_TYPE

	public size?: number
	public shape?: SymbolType | string = SymbolType.CIRCLE
}
