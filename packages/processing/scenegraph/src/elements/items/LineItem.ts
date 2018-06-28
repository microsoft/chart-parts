import { MarkType, Interpolation } from '@gog/interfaces'
import { SGLineItem } from '@gog/interfaces'
import { Item } from './Item'

export class LineItem extends Item implements SGLineItem {
	public static ITEM_TYPE = MarkType.Line
	public readonly itemtype: string = LineItem.ITEM_TYPE

	public interpolate?: Interpolation = Interpolation.LINEAR
	public tension?: number
	public defined?: boolean
}
