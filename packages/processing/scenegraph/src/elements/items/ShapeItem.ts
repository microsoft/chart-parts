import { MarkType, SGShapeItem } from '@markable/interfaces'
import { Item } from './Item'

export class ShapeItem extends Item implements SGShapeItem {
	public static ITEM_TYPE = MarkType.Shape
	public readonly itemtype = ShapeItem.ITEM_TYPE
}
