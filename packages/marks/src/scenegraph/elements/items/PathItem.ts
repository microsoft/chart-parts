import { Item } from './Item'

/**
 * Path marks are arbitrary shapes, defined as an SVG path. Path marks can be used to represent custom shapes,
 * including geographic regions on maps.
 */
export class PathItem extends Item {
	public static ITEM_TYPE = 'path'
	public readonly itemType: string = PathItem.ITEM_TYPE

	/**
	 * An SVG path string describing the geometry of the path.
	 */
	public path?: string
}
