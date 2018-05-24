import { Item } from './Item'

/**
 * Arc marks are circular arcs defined by a center point plus angular and radial extents.
 * Arc marks are typically used for radial plots such as pie and donut charts, but are
 * also useful for radial space-filling visualizations of hierarchical data.
 */
export class Arc extends Item {
	public static ITEM_TYPE = 'arc'
	public readonly itemType: string = Arc.ITEM_TYPE

	/**
	 * The start angle in radians. A value of 0 indicates up or “north”, increasing values proceed clockwise.
	 */
	public startAngle?: number

	/**
	 * The end angle in radians. A value of 0 indicates up or “north”, increasing values proceed clockwise.
	 */
	public endAngle?: number

	/**
	 * The angular padding applied to sides of the arc, in radians.
	 */
	public padAngle?: number

	/**
	 * The inner radius in pixels.
	 */
	public innerRadius?: number

	/**
	 * The outer radius in pixels.
	 */
	public outerRadius?: number

	/**
	 * The radius in pixels of rounded arc corners (default 0).
	 */
	public cornerRadius?: number = 0
}
