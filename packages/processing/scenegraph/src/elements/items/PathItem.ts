import { MarkType, SGPathItem } from '@markable/interfaces'
import { Item } from './Item'

export class PathItem extends Item implements SGPathItem {
	public static ITEM_TYPE = MarkType.Path
	public readonly itemtype = PathItem.ITEM_TYPE

	public path?: string
}
