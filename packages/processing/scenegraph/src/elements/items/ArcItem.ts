import { MarkType, SGArcItem } from '@markable/interfaces'
import { Item } from './Item'

export class ArcItem extends Item implements SGArcItem {
	public static ITEM_TYPE = MarkType.Arc
	public readonly itemtype: string = ArcItem.ITEM_TYPE

	public startAngle?: number
	public endAngle?: number
	public padAngle?: number
	public innerRadius?: number
	public outerRadius?: number
	public cornerRadius?: number = 0
}
