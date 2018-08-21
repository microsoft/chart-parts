import { MarkType, SGTrailItem } from '@markable/interfaces'
import { Item } from './Item'

export class TrailItem extends Item implements SGTrailItem {
	public static ITEM_TYPE = MarkType.Trail
	public readonly itemtype: string = TrailItem.ITEM_TYPE

	/**
	 * The width in pixels of the trail at the given data point.
	 */
	public size?: number

	/**
	 * A boolean flag indicating if the current data point is defined.
	 * If false, the corresponding trail segment will be omitted, creating a “break”.
	 */
	public defined?: boolean
}
