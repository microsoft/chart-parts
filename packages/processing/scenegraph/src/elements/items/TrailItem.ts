import { Item } from './Item'

/**
 * Trail marks are similar to line marks, but can have variable widths determined by backing data.
 * Unlike area marks, trails do not have a set vertical or horizontal orientation: they can follow
 * arbitrary trajectories. However, unlike lines, trails do not support different interpolation methods
 * and use fill (not stroke) for their color. Trail marks are useful if one wishes to draw lines that
 * change size to reflect the underlying data.
 */
export class TrailItem extends Item {
	public static ITEM_TYPE = 'trail'
	public readonly itemType: string = TrailItem.ITEM_TYPE

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
