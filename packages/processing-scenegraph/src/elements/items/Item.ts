/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	StrokeCap,
	StrokeJoin,
	SGItem,
	SGNodeType,
} from '@chart-parts/interfaces'
import { SceneNode } from '../SceneNode'

export abstract class Item extends SceneNode implements SGItem {
	public abstract readonly itemtype: string

	public nodetype: SGNodeType = SGNodeType.Item

	/**
	 * The primary x-coordinate in pixels.
	 */
	public x?: number

	/**
	 * The secondary x-coordinate in pixels.
	 */
	public x2?: number

	/**
	 * The center x-coordinate. Incompatible with x and x2.
	 */
	public xc?: number

	/**
	 * The width of the mark in pixels, if supported.
	 */
	public width?: number

	/**
	 * The primary y-coordinate in pixels.
	 */
	public y?: number

	/**
	 * The secondary y-coordinate in pixels.
	 */
	public y2?: number

	/**
	 * The center y-coordinate. Incompatible with y and y2.
	 */
	public yc?: number

	/**
	 * The height of the mark in pixels, if supported.
	 */
	public height?: number

	/**
	 * The mark opacity from 0 (transparent) to 1 (opaque).
	 */
	public opacity?: number

	/**
	 * The fill color.
	 */
	public fill? = 'none'

	/**
	 * The fill opacity from 0 (transparent) to 1 (opaque).
	 */
	public fillOpacity?: number

	/**
	 * The stroke color.
	 */
	public stroke? = 'none'

	/**
	 * The stroke opacity from 0 (transparent) to 1 (opaque).
	 */
	public strokeOpacity?: number

	/**
	 * The stroke width in pixels.
	 */
	public strokeWidth?: number

	/**
	 * The stroke cap for line ending style. One of butt (default), round or square.
	 */
	public strokeCap?: StrokeCap = StrokeCap.Butt

	/**
	 * An array of [stroke, space] lengths for creating dashed or dotted lines.
	 */
	public strokeDash?: [number, number]

	/**
	 * The pixel offset at which to start the stroke dash array.
	 */
	public strokeDashOffset?: number

	/**
	 * The stroke line join method. One of miter (default), round or bevel.
	 */
	public strokeJoin?: StrokeJoin = StrokeJoin.Miter

	/**
	 * The miter limit at which to bevel a line join.
	 */
	public strokeMiterLimit?: number

	/**
	 * The mouse cursor used over the mark. Any valid CSS cursor type can be used.
	 */
	public cursor?: string

	/**
	 * A URL to load upon mouse click. If defined, the mark acts as a hyperlink.
	 */
	public href?: string

	/**
	 * The tooltip text to show upon mouse hover. If the value is an object (other than a Date or an array),
	 * then all key-value pairs in the object will be shown in the tooltip, one per line
	 * (e.g., "key1: value1\nkey2: value2"). Array values will be shown in brackets [value1, value2, ...].
	 *
	 * Other values will be coerced to strings. Nested object values will not be recursively printed.
	 */
	public tooltip?: any

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
	public zIndex? = 0

	public ariaTitle?: string
	public ariaDescription?: string
	public tabIndex?: number

	/**
	 * Event channels are a mapping of event names to their output channel.
	 */
	public channels: { [name: string]: string } = {}
}
