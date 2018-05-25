import { Item } from './Item'
import { Orientation, Interpolation } from './interfaces'

/**
 * Area marks are filled areas with either horizontal or vertical alignment.
 * Area marks are often used to show change over time, using either a single area or stacked areas.
 * Area marks can also be used to encode value ranges (min, max) or uncertainty over time.
 */
export class AreaItem extends Item {
	public static ITEM_TYPE = 'area'
	public readonly itemType: string = AreaItem.ITEM_TYPE

	/**
	 * The orientation of the area mark. One of horizontal or vertical (the default).
	 * With a vertical orientation, an area mark is defined by the x, y, and (y2 or height)
	 * properties; with a horizontal orientation, the y, x and (x2 or width) properties must
	 * be specified instead.
	 */
	public orient?: Orientation = Orientation.VERTICAL

	/**
	 * The interpolation method to use. One of basis, cardinal, catmull-rom, linear, monotone,
	 * natural, step, step-after, step-before. The default is linear.
	 */
	public interpolate: Interpolation = Interpolation.LINEAR

	/**
	 * The tension value in the range [0, 1] to parameterize cardinal (default 0) or
	 * catmull-rom (default 0.5) interpolation.
	 */
	public tension?: number

	/**
	 * A boolean flag indicating if the current data point is defined.
	 * If false, the corresponding area segment will be omitted, creating a “break”.
	 */
	public defined?: boolean
}
