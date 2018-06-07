import { MarkType } from '@gog/mark-interfaces'
import { SGRectItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class RectItem extends Item implements SGRectItem {
	public static ITEM_TYPE = MarkType.Rect
	public readonly itemtype: string = RectItem.ITEM_TYPE

	public cornerRadius?: number = 0
}
