import { SGMark, SGGroupItem, MarkType } from '@gog/mark-interfaces'
import { Item } from './Item'
import { Mark } from '../Mark'

export class GroupItem extends Item implements SGGroupItem {
	public static ITEM_TYPE = MarkType.Group
	public readonly itemtype: string = GroupItem.ITEM_TYPE

	public clip?: boolean
	public cornerRadius?: number = 0
	public items: Array<SGMark<any>> = []
}
