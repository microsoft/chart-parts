import { MarkType, SGPathItem } from '@chart-parts/interfaces'
import { Item } from './Item'

export class PathItem extends Item implements SGPathItem {
	public static ITEM_TYPE = MarkType.Path
	public readonly itemtype = PathItem.ITEM_TYPE

	public path?: string
}
