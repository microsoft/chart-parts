import { Mark } from './Mark'
import { SymbolType } from './interfaces'

/**
 * Symbol marks are shapes useful for plotting data, and include circles, squares and oriented triangles.
 * Symbol size can be scaled to indicate magnitudes. In addition to a set of built-in shapes, custom shapes
 * can be defined using SVG path strings.
 */
export class Symbol extends Mark {
	/**
	 * The area in pixels of the symbols bounding box. Note that this value sets the area of the symbol;
	 * the side lengths will increase with the square root of this value.
	 */
	public size?: number

	/**
	 * The symbol shape. One of circle (default), square, cross, diamond, triangle-up, triangle-down,
	 * triangle-right, triangle-left. Alternatively, a custom SVG path string can be provided.
	 *
	 * For correct sizing, custom shape paths should be defined within a square with coordinates
	 * ranging from -1 to 1 along both the x and y dimensions.
	 */
	public shape?: SymbolType | string = SymbolType.CIRCLE
}
