import { SGPathItem, MarkType } from '@gog/mark-interfaces'
import { Item } from './Item'

export class PathItem extends Item implements SGPathItem {
	public static ITEM_TYPE = MarkType.Path
	public readonly itemtype: string = PathItem.ITEM_TYPE

	public path?: string
}
