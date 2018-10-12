/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	StrokeJoin,
	StrokeCap,
	Orientation,
	Interpolation,
	HorizontalAlignment,
	SymbolType,
	VerticalTextAlignment,
	TextDirection,
	FontWeight,
	MarkType,
	Gradient,
} from './common-types'

export enum SGNodeType {
	Mark = 'mark',
	Item = 'item',
}

export interface Metadata {
	id: string
	index?: number
	[key: string]: any
}

export interface SGNode {
	readonly nodetype: SGNodeType
	readonly parent?: SGNode
	readonly parentType?: SGNodeType
	readonly metadata: Metadata
}

export interface SGMark<Item extends SGItem> extends SGNode {
	/**
	 * The type of mark this is
	 */
	readonly marktype?: MarkType

	/**
	 * The mark items
	 */
	readonly items: Item[]

	/**
	 * Whether to clip children of this mark
	 */
	readonly clip?: boolean

	/**
	 * Whether this mark responds to interactive events
	 */
	readonly interactive?: boolean

	/**
	 * The custom role of this mark, used to emit class information
	 */
	readonly role?: string

	/**
	 * A helpful name for this mark
	 */
	readonly name?: string

	/**
	 * The z-index of this mark
	 */
	readonly zIndex?: number
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
	readonly fill?: string | Gradient

	/**
	 * The fill opacity from 0 (transparent) to 1 (opaque).
	 */
	readonly fillOpacity?: number

	/**
	 * The stroke color.
	 */
	readonly stroke?: string | Gradient

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

	/**
	 * The accessible title to apply to the scenegraph item
	 */
	readonly ariaTitle?: string

	/**
	 * The accessible description to apply to the scenegraph item
	 */
	readonly ariaDescription?: string

	/**
	 * The tab-index to use for the given item. If defined, it is a tab stop. This is important to use
	 * when making charts accessible, as it allows screen-reader users to navigate the chart via keyboard.
	 */
	readonly tabIndex?: number

	/**
	 * A mapping of client event-names to channel-identifiers
	 */
	readonly channels?: { [key: string]: string }
}

/**
 * Arc marks are circular arcs defined by a center point plus angular and radial extents.
 * Arc marks are typically used for radial plots such as pie and donut charts, but are
 * also useful for radial space-filling visualizations of hierarchical data.
 */
export interface SGArcItem extends SGItem {
	/**
	 * The start angle in radians. A value of 0 indicates up or “north”, increasing values proceed clockwise.
	 */
	startAngle?: number

	/**
	 * The end angle in radians. A value of 0 indicates up or “north”, increasing values proceed clockwise.
	 */
	endAngle?: number

	/**
	 * The angular padding applied to sides of the arc, in radians.
	 */
	padAngle?: number

	/**
	 * The inner radius in pixels.
	 */
	innerRadius?: number

	/**
	 * The outer radius in pixels.
	 */
	outerRadius?: number

	/**
	 * The radius in pixels of rounded arc corners (default 0).
	 */
	cornerRadius?: number
}

/**
 * Area marks are filled areas with either horizontal or vertical alignment.
 * Area marks are often used to show change over time, using either a single area or stacked areas.
 * Area marks can also be used to encode value ranges (min, max) or uncertainty over time.
 */
export interface SGAreaItem extends SGItem {
	/**
	 * The orientation of the area mark. One of horizontal or vertical (the default).
	 * With a vertical orientation, an area mark is defined by the x, y, and (y2 or height)
	 * properties; with a horizontal orientation, the y, x and (x2 or width) properties must
	 * be specified instead.
	 */
	orient?: Orientation

	/**
	 * The interpolation method to use. One of basis, cardinal, catmull-rom, linear, monotone,
	 * natural, step, step-after, step-before. The default is linear.
	 */
	interpolate: Interpolation

	/**
	 * The tension value in the range [0, 1] to parameterize cardinal (default 0) or
	 * catmull-rom (default 0.5) interpolation.
	 */
	tension?: number

	/**
	 * A boolean flag indicating if the current data point is defined.
	 * If false, the corresponding area segment will be omitted, creating a “break”.
	 */
	defined?: boolean
}

/**
 *  Group marks are containers for other marks, and used to create visualizations with multiple views or layers.
 * Each group instance recursively defines its own nested visualization specification.
 * Group marks provide their own coordinate space and can include nested data, signal, scale, axis, legend,
 * title and mark definitions. In addition a group mark may have a colored background, similar to a rect mark.
 */
export interface SGGroupItem extends SGItem {
	/**
	 * A boolean flag indicating if the visible group content should be clipped to the group’s
	 * specified width and height.
	 */
	clip?: boolean

	/**
	 * The radius in pixels of rounded rectangle corners for the group background (default 0).
	 */
	cornerRadius?: number

	/**
	 * The nested marks for this item
	 */
	items: Array<SGMark<any>>
}

/**
 * Line marks are stroked paths with constant width, defined by an ordered set of (x, y) coordinates.
 * While line marks default to using straight line segments, different interpolation methods can be
 * used to create smoothed or stepped paths. Line marks are commonly used to depict trajectories or
 * change over time.
 *
 * Note: If a data point on a line is surrounded by points with defined: false, it may not be visible.
 * Use a strokeCap of round or square to ensure a visible point is drawn.
 */
export interface SGLineItem extends SGItem {
	/**
	 * The interpolation method to use. One of basis, bundle, cardinal, catmull-rom, linear,
	 * monotone, natural, step, step-after, step-before. The default is linear. You can find
	 * explanations for these line interpolators in the d3-shape documentation.
	 */
	interpolate?: Interpolation

	/**
	 * The tension value in the range [0, 1] to parameterize bundle (default 0.8),
	 * cardinal (default 0) or catmull-rom (default 0.5) interpolation.
	 */
	tension?: number

	/**
	 * A boolean flag indicating if the current data point is defined.
	 * If false, the corresponding line segment will be omitted, creating a “break”.
	 */
	defined?: boolean
}

/**
 * Path marks are arbitrary shapes, defined as an SVG path. Path marks can be used to represent custom shapes,
 * including geographic regions on maps.
 */
export interface SGPathItem extends SGItem {
	/**
	 * An SVG path string describing the geometry of the path.
	 */
	path?: string
}

/**
 * Rect marks are rectangles with a given position, width and height.
 * Rect marks are useful in a wide variety of visualizations, including bar charts and timelines.
 */
export interface SGRectItem extends SGItem {
	/**
	 * The radius in pixels of rounded rectangle corners (default 0).
	 */
	cornerRadius?: number
}

/**
 * Rule marks provide a convenient way to draw individual line segments.
 * A rule is simply a line from (x, y) to (x2, y2).
 * One of the primary uses of rule marks is to draw axis ticks and grid lines.
 */
export type SGRuleItem = SGItem

/**
 * Symbol marks are shapes useful for plotting data, and include circles, squares and oriented triangles.
 * Symbol size can be scaled to indicate magnitudes. In addition to a set of built-in shapes, custom shapes
 * can be defined using SVG path strings.
 */
export interface SGSymbolItem extends SGItem {
	/**
	 * The area in pixels of the symbols bounding box. Note that this value sets the area of the symbol;
	 * the side lengths will increase with the square root of this value.
	 */
	size?: number

	/**
	 * The symbol shape. One of circle (default), square, cross, diamond, triangle-up, triangle-down,
	 * triangle-right, triangle-left. Alternatively, a custom SVG path string can be provided.
	 *
	 * For correct sizing, custom shape paths should be defined within a square with coordinates
	 * ranging from -1 to 1 along both the x and y dimensions.
	 */
	shape?: SymbolType | string
}

/**
 * Text marks can be used to annotate data, and provide labels and titles for axes and legends.
 */
export interface SGTextItem extends SGItem {
	/**
	 * The horizontal text alignment. One of left (default), center, or right.
	 */
	align?: HorizontalAlignment

	/**
	 * The rotation angle of the text in degrees (default 0).
	 */
	angle?: number

	/**
	 * The vertical text baseline. One of alphabetic (default), top, middle, bottom.
	 */
	baseline?: VerticalTextAlignment

	/**
	 * The direction of the text. One of ltr (left-to-right, default) or rtl (right-to-left).
	 * This property determines on which side is truncated in response to the limit parameter.
	 */
	dir?: TextDirection

	/**
	 * The horizontal offset in pixels (before rotation), between the text and anchor point.
	 */
	dx?: number

	/**
	 * The vertical offset in pixels (before rotation), between the text and anchor point.
	 */
	dy?: number

	/**
	 * The ellipsis string for text truncated in response to the limit parameter (default “…”).
	 */
	ellipsis?: string

	/**
	 * The typeface to set the text in (e.g., Helvetica Neue).
	 */
	font?: string

	/**
	 * The font size in pixels.
	 */
	fontSize?: number

	/**
	 * The font weight (e.g., normal or bold).
	 */
	fontWeight?: FontWeight

	/**
	 * The variant of the font to use
	 */
	fontVariant?: string | number

	/**
	 * The font style (e.g., normal or italic).
	 */
	fontStyle?: string

	/**
	 * The maximum length of the text mark in pixels (default 0, indicating no limit).
	 * The text value will be automatically truncated if the rendered size exceeds the limit.
	 */
	limit?: number

	/**
	 * Polar coordinate radial offset in pixels, relative to the origin determined by the
	 * x and y properties (default 0).
	 */
	radius?: number

	/**
	 * The text to display. This text may be truncated if the rendered length of the text exceeds the limit parameter.
	 */
	text?: string

	/**
	 * Polar coordinate angle in radians, relative to the origin determined by the x and y properties (default 0).
	 * Values for theta follow the same convention of arc marks: angles are measured in radians, with 0 indicating
	 * up or “north”.
	 */
	theta?: number
}
