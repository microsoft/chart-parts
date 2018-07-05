import { MarkType, SGShapeItem } from '@gog/interfaces'
import { Item } from './Item'

export class ShapeItem extends Item implements SGShapeItem {
	public static ITEM_TYPE = MarkType.Shape
	public readonly itemtype: string = ShapeItem.ITEM_TYPE
}
