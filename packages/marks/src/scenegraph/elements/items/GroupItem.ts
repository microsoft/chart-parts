import { Item } from './Item'
import { Mark } from '../Mark'

/**
 *  Group marks are containers for other marks, and used to create visualizations with multiple views or layers.
 * Each group instance recursively defines its own nested visualization specification.
 * Group marks provide their own coordinate space and can include nested data, signal, scale, axis, legend,
 * title and mark definitions. In addition a group mark may have a colored background, similar to a rect mark.
 */
export class GroupItem extends Item {
	public static ITEM_TYPE = 'group'
	public readonly itemType: string = GroupItem.ITEM_TYPE

	/**
	 * A boolean flag indicating if the visible group content should be clipped to the group’s
	 * specified width and height.
	 */
	public clip?: boolean

	/**
	 * The radius in pixels of rounded rectangle corners for the group background (default 0).
	 */
	public cornerRadius?: number = 0

	public items: Mark[] = []
}
