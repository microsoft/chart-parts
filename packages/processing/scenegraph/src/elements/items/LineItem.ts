import { MarkType, Interpolation, SGLineItem } from '@gog/interfaces'
import { Item } from './Item'

export class LineItem extends Item implements SGLineItem {
	public static ITEM_TYPE = MarkType.Line
	public readonly itemtype: string = LineItem.ITEM_TYPE

	public interpolate?: Interpolation = Interpolation.Linear
	public tension?: number
	public defined?: boolean
}
