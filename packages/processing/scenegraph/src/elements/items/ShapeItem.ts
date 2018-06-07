import { MarkType } from '@gog/mark-interfaces'
import { SGShapeItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class ShapeItem extends Item implements SGShapeItem {
	public static ITEM_TYPE = MarkType.Shape
	public readonly itemtype: string = ShapeItem.ITEM_TYPE
}
