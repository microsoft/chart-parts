import { SGRectItem, MarkType } from '@markable/interfaces'
import { Item } from './Item'

export class RectItem extends Item implements SGRectItem {
	public static ITEM_TYPE = MarkType.Rect
	public readonly itemtype: string = RectItem.ITEM_TYPE

	public cornerRadius?: number = 0
}
