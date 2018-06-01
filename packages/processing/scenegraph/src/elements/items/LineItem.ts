import { Item } from './Item'
import { Interpolation } from '@gog/mark-interfaces'

/**
 * Line marks are stroked paths with constant width, defined by an ordered set of (x, y) coordinates.
 * While line marks default to using straight line segments, different interpolation methods can be
 * used to create smoothed or stepped paths. Line marks are commonly used to depict trajectories or
 * change over time.
 *
 * Note: If a data point on a line is surrounded by points with defined: false, it may not be visible.
 * Use a strokeCap of round or square to ensure a visible point is drawn.
 */
export class LineItem extends Item {
	public static ITEM_TYPE = 'line'
	public readonly itemtype: string = LineItem.ITEM_TYPE

	/**
	 * The interpolation method to use. One of basis, bundle, cardinal, catmull-rom, linear,
	 * monotone, natural, step, step-after, step-before. The default is linear. You can find
	 * explanations for these line interpolators in the d3-shape documentation.
	 */
	public interpolate?: Interpolation = Interpolation.LINEAR

	/**
	 * The tension value in the range [0, 1] to parameterize bundle (default 0.8),
	 * cardinal (default 0) or catmull-rom (default 0.5) interpolation.
	 */
	public tension?: number

	/**
	 * A boolean flag indicating if the current data point is defined.
	 * If false, the corresponding line segment will be omitted, creating a “break”.
	 */
	public defined?: boolean
}
