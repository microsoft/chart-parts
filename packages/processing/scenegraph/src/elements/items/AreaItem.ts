import { MarkType, Orientation, Interpolation } from '@gog/mark-interfaces'
import { SGAreaItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class AreaItem extends Item implements SGAreaItem {
	public static ITEM_TYPE = MarkType.Area
	public readonly itemtype: string = AreaItem.ITEM_TYPE

	public orient?: Orientation = Orientation.VERTICAL
	public interpolate: Interpolation = Interpolation.LINEAR
	public tension?: number
	public defined?: boolean
}
