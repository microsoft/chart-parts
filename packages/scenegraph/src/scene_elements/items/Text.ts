import { Item } from './Item'
import {
	HorizontalAlignment,
	VerticalTextAlignment,
	TextDirection,
} from './interfaces'

/**
 * Text marks can be used to annotate data, and provide labels and titles for axes and legends.
 */
export class Text extends Item {
	public static ITEM_TYPE = 'text'
	public readonly itemType: string = Text.ITEM_TYPE

	/**
	 * The horizontal text alignment. One of left (default), center, or right.
	 */
	public align?: HorizontalAlignment = HorizontalAlignment.LEFT

	/**
	 * The rotation angle of the text in degrees (default 0).
	 */
	public angle?: number = 0

	/**
	 * The vertical text baseline. One of alphabetic (default), top, middle, bottom.
	 */
	public baseline?: VerticalTextAlignment = VerticalTextAlignment.ALPHABETIC

	/**
	 * The direction of the text. One of ltr (left-to-right, default) or rtl (right-to-left).
	 * This property determines on which side is truncated in response to the limit parameter.
	 */
	public dir?: TextDirection = TextDirection.LTR

	/**
	 * The horizontal offset in pixels (before rotation), between the text and anchor point.
	 */
	public dx?: number

	/**
	 * The vertical offset in pixels (before rotation), between the text and anchor point.
	 */
	public dy?: number

	/**
	 * The ellipsis string for text truncated in response to the limit parameter (default “…”).
	 */
	public ellipsis?: string = '...'

	/**
	 * The typeface to set the text in (e.g., Helvetica Neue).
	 */
	public font?: string

	/**
	 * The font size in pixels.
	 */
	public fontSize?: number

	/**
	 * The font weight (e.g., normal or bold).
	 */
	public fontWeight?: string | number

	/**
	 * The variant of the font to use
	 */
	public fontVariant?: string | number

	/**
	 * The font style (e.g., normal or italic).
	 */
	public fontStyle?: string

	/**
	 * The maximum length of the text mark in pixels (default 0, indicating no limit).
	 * The text value will be automatically truncated if the rendered size exceeds the limit.
	 */
	public limit?: number = 0

	/**
	 * Polar coordinate radial offset in pixels, relative to the origin determined by the
	 * x and y properties (default 0).
	 */
	public radius?: number = 0

	/**
	 * The text to display. This text may be truncated if the rendered length of the text exceeds the limit parameter.
	 */
	public text?: string

	/**
	 * Polar coordinate angle in radians, relative to the origin determined by the x and y properties (default 0).
	 * Values for theta follow the same convention of arc marks: angles are measured in radians, with 0 indicating
	 * up or “north”.
	 */
	public theta?: number
}
