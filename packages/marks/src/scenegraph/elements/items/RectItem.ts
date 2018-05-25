import { Item } from './Item'

/**
 * Rect marks are rectangles with a given position, width and height.
 * Rect marks are useful in a wide variety of visualizations, including bar charts and timelines.
 */
export class RectItem extends Item {
	public static ITEM_TYPE = 'rect'
	public readonly itemType: string = RectItem.ITEM_TYPE

	/**
	 * The radius in pixels of rounded rectangle corners (default 0).
	 */
	public cornerRadius?: number = 0
}
