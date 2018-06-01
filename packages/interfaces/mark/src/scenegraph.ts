import { StrokeJoin, StrokeCap } from './mark'

export enum SGNodeType {
	Mark = 'mark',
	Item = 'item',
}

export interface SGNode {
	readonly nodetype: SGNodeType
	readonly parent?: SGNode
	readonly parentType?: SGNodeType
	readonly metadata: { [key: string]: any }
}

export interface SGMark<Item> extends SGNode {
	readonly marktype?: string
	readonly items: Item[]
	readonly clip?: boolean
	readonly interactive?: boolean
}

export interface SGItem extends SGNode {
	readonly itemtype: string

	/**
	 * The primary x-coordinate in pixels.
	 */
	readonly x?: number

	/**
	 * The secondary x-coordinate in pixels.
	 */
	readonly x2?: number

	/**
	 * The center x-coordinate. Incompatible with x and x2.
	 */
	readonly xc?: number

	/**
	 * The width of the mark in pixels, if supported.
	 */
	readonly width?: number

	/**
	 * The primary y-coordinate in pixels.
	 */
	readonly y?: number

	/**
	 * The secondary y-coordinate in pixels.
	 */
	readonly y2?: number

	/**
	 * The center y-coordinate. Incompatible with y and y2.
	 */
	readonly yc?: number

	/**
	 * The height of the mark in pixels, if supported.
	 */
	readonly height?: number

	/**
	 * The mark opacity from 0 (transparent) to 1 (opaque).
	 */
	readonly opacity?: number

	/**
	 * The fill color.
	 */
	readonly fill?: string

	/**
	 * The fill opacity from 0 (transparent) to 1 (opaque).
	 */
	readonly fillOpacity?: number

	/**
	 * The stroke color.
	 */
	readonly stroke?: string

	/**
	 * The stroke opacity from 0 (transparent) to 1 (opaque).
	 */
	readonly strokeOpacity?: number

	/**
	 * The stroke width in pixels.
	 */
	readonly strokeWidth?: number

	/**
	 * The stroke cap for line ending style. One of butt (default), round or square.
	 */
	readonly strokeCap?: StrokeCap

	/**
	 * An array of [stroke, space] lengths for creating dashed or dotted lines.
	 */
	readonly strokeDash?: [number, number]

	/**
	 * The pixel offset at which to start the stroke dash array.
	 */
	readonly strokeDashOffset?: number

	/**
	 * The stroke line join method. One of miter (default), round or bevel.
	 */
	readonly strokeJoin?: StrokeJoin

	/**
	 * The miter limit at which to bevel a line join.
	 */
	readonly strokeMiterLimit?: number

	/**
	 * The mouse cursor used over the mark. Any valid CSS cursor type can be used.
	 */
	readonly cursor?: string

	/**
	 * A URL to load upon mouse click. If defined, the mark acts as a hyperlink.
	 */
	readonly href?: string

	/**
	 * The tooltip text to show upon mouse hover. If the value is an object (other than a Date or an array),
	 * then all key-value pairs in the object will be shown in the tooltip, one per line
	 * (e.g., "key1: value1\nkey2: value2"). Array values will be shown in brackets [value1, value2, ...].
	 *
	 * Other values will be coerced to strings. Nested object values will not be recursively printed.
	 */
	readonly tooltip?: any

	/**
	 * An integer z-index indicating the layering order of sibling mark items. The default value is 0.
	 * Higher values (1) will cause marks to be drawn on top of those with lower z-index values. Setting
	 * the z-index as an encoding property only affects ordering among sibling mark items; it will not change
	 * the layering relative to other mark definitions. Unlike the mark-level sort property, zindex changes the
	 * rendering order only; it does not otherwise change mark item order (such as line or area point order).
	 *
	 * The most common use of zindex is to ensure that a mark is drawn over its siblings when selected, such as
	 * by mouse hover.
	 */
	readonly zIndex?: number
}
