import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGGroupItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class GroupItem extends Item implements SGGroupItem {
	public static ITEM_TYPE = MarkType.Group
	public readonly itemtype: string = GroupItem.ITEM_TYPE

	public clip?: boolean
	public cornerRadius?: number = 0
	public items: Array<SGMark<any>> = []
}
