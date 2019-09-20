/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkEncoding,
	ChannelHandler,
	Gradient,
	StrokeCap,
	StrokeJoin,
	Metadata,
} from '@chart-parts/interfaces'

/**
 * Commonly available encoding parameters for Mark components
 * @category Mark
 */
export interface CommonMarkEncodings {
	// Common Mark Value Encodings
	x?: MarkEncoding<number>
	x2?: MarkEncoding<number>
	xc?: MarkEncoding<number>
	width?: MarkEncoding<number>
	y?: MarkEncoding<number>
	y2?: MarkEncoding<number>
	yc?: MarkEncoding<number>
	height?: MarkEncoding<number>
	opacity?: MarkEncoding<number>
	fill?: MarkEncoding<string | Gradient>
	fillOpacity?: MarkEncoding<number>
	stroke?: MarkEncoding<string | Gradient>
	strokeOpacity?: MarkEncoding<number>
	strokeWidth?: MarkEncoding<number>
	strokeCap?: MarkEncoding<StrokeCap>
	strokeDash?: MarkEncoding<[number, number]>
	strokeDashOffset?: MarkEncoding<number>
	strokeJoin?: MarkEncoding<StrokeJoin>
	strokeMiterLimit?: MarkEncoding<number>
	cursor?: MarkEncoding<string>
	href?: MarkEncoding<string>
	tooltip?: MarkEncoding<string>
	zIndex?: MarkEncoding<number>
	metadata?: MarkEncoding<Metadata>

	// Screen-Reader properties
	ariaTitle?: MarkEncoding<string>
	ariaDescription?: MarkEncoding<string>
	tabIndex?: MarkEncoding<number>
}

/**
 * Commonly Available Event Handlers for Mark Components
 * @category Mark
 */
export interface CommonMarkChannels {
	// Clipboard Events
	onCopy?: ChannelHandler<React.ClipboardEvent<any>>
	onCut?: ChannelHandler<React.ClipboardEvent<any>>
	onPaste?: ChannelHandler<React.ClipboardEvent<any>>

	// Keyboard Events
	onKeyDown?: ChannelHandler<React.KeyboardEvent<any>>
	onKeyPress?: ChannelHandler<React.KeyboardEvent<any>>
	onKeyUp?: ChannelHandler<React.KeyboardEvent<any>>

	// Focus events
	onFocus?: ChannelHandler<React.FocusEvent<any>>
	onBlur?: ChannelHandler<React.FocusEvent<any>>

	// Mouse Events
	onClick?: ChannelHandler<React.MouseEvent<any>>
	onContextMenu?: ChannelHandler<React.MouseEvent<any>>
	onDoubleClick?: ChannelHandler<React.MouseEvent<any>>
	onDrag?: ChannelHandler<React.MouseEvent<any>>
	onDragEnd?: ChannelHandler<React.MouseEvent<any>>
	onDragEnter?: ChannelHandler<React.MouseEvent<any>>
	onDragExit?: ChannelHandler<React.MouseEvent<any>>
	onDragLeave?: ChannelHandler<React.MouseEvent<any>>
	onDragOver?: ChannelHandler<React.MouseEvent<any>>
	onDragStart?: ChannelHandler<React.MouseEvent<any>>
	onDrop?: ChannelHandler<React.MouseEvent<any>>
	onMouseDown?: ChannelHandler<React.MouseEvent<any>>
	onMouseEnter?: ChannelHandler<React.MouseEvent<any>>
	onMouseLeave?: ChannelHandler<React.MouseEvent<any>>
	onMouseMove?: ChannelHandler<React.MouseEvent<any>>
	onMouseOut?: ChannelHandler<React.MouseEvent<any>>
	onMouseOver?: ChannelHandler<React.MouseEvent<any>>
	onMouseUp?: ChannelHandler<React.MouseEvent<any>>

	// Pointer Events
	onPointerDown?: ChannelHandler<React.PointerEvent<any>>
	onPointerMove?: ChannelHandler<React.PointerEvent<any>>
	onPointerUp?: ChannelHandler<React.PointerEvent<any>>
	onPointerCancel?: ChannelHandler<React.PointerEvent<any>>
	onGotPointerCapture?: ChannelHandler<React.PointerEvent<any>>
	onLostPointerCapture?: ChannelHandler<React.PointerEvent<any>>
	onPointerEnter?: ChannelHandler<React.PointerEvent<any>>
	onPointerLeave?: ChannelHandler<React.PointerEvent<any>>
	onPointerOver?: ChannelHandler<React.PointerEvent<any>>
	onPointerOut?: ChannelHandler<React.PointerEvent<any>>

	// Selection events
	onSelect?: ChannelHandler<React.SyntheticEvent<any>>

	// Touch events
	onTouchCancel?: ChannelHandler<React.TouchEvent<any>>
	onTouchEnd?: ChannelHandler<React.TouchEvent<any>>
	onTouchMove?: ChannelHandler<React.TouchEvent<any>>
	onTouchStart?: ChannelHandler<React.TouchEvent<any>>

	// UI Events
	onScroll?: ChannelHandler<React.UIEvent<any>>

	// Wheel events
	onWheel?: ChannelHandler<React.WheelEvent<any>>
}

/**
 * Common mark-component properties
 * @category Mark
 */
export interface CommonMarkProps
	extends CommonMarkEncodings,
		CommonMarkChannels {
	// Data-binding
	/**
	 * The name of the data-table to bind to. If not present, the component will render as a singleton
	 */
	table?: string

	/**
	 * A helpful name for the mark
	 */
	name?: string

	/**
	 * A role description of this mark
	 */
	role?: string

	// Events
	eventHandlers?: { [key: string]: ChannelHandler<any> }
}
