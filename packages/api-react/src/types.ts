/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type {
	MarkEncoding,
	ChannelHandler,
	Gradient,
	StrokeCap,
	StrokeJoin,
	Metadata,
} from '@chart-parts/interfaces'
import type {
	ClipboardEvent,
	FocusEvent,
	MouseEvent,
	PointerEvent,
	KeyboardEvent,
	UIEvent,
	SyntheticEvent,
	TouchEvent,
	WheelEvent,
} from 'react'

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
	onCopy?: ChannelHandler<ClipboardEvent<any>>
	onCut?: ChannelHandler<ClipboardEvent<any>>
	onPaste?: ChannelHandler<ClipboardEvent<any>>

	// Keyboard Events
	onKeyDown?: ChannelHandler<KeyboardEvent<any>>
	onKeyPress?: ChannelHandler<KeyboardEvent<any>>
	onKeyUp?: ChannelHandler<KeyboardEvent<any>>

	// Focus events
	onFocus?: ChannelHandler<FocusEvent<any>>
	onBlur?: ChannelHandler<FocusEvent<any>>

	// Mouse Events
	onClick?: ChannelHandler<MouseEvent<any>>
	onContextMenu?: ChannelHandler<MouseEvent<any>>
	onDoubleClick?: ChannelHandler<MouseEvent<any>>
	onDrag?: ChannelHandler<MouseEvent<any>>
	onDragEnd?: ChannelHandler<MouseEvent<any>>
	onDragEnter?: ChannelHandler<MouseEvent<any>>
	onDragExit?: ChannelHandler<MouseEvent<any>>
	onDragLeave?: ChannelHandler<MouseEvent<any>>
	onDragOver?: ChannelHandler<MouseEvent<any>>
	onDragStart?: ChannelHandler<MouseEvent<any>>
	onDrop?: ChannelHandler<MouseEvent<any>>
	onMouseDown?: ChannelHandler<MouseEvent<any>>
	onMouseEnter?: ChannelHandler<MouseEvent<any>>
	onMouseLeave?: ChannelHandler<MouseEvent<any>>
	onMouseMove?: ChannelHandler<MouseEvent<any>>
	onMouseOut?: ChannelHandler<MouseEvent<any>>
	onMouseOver?: ChannelHandler<MouseEvent<any>>
	onMouseUp?: ChannelHandler<MouseEvent<any>>

	// Pointer Events
	onPointerDown?: ChannelHandler<PointerEvent<any>>
	onPointerMove?: ChannelHandler<PointerEvent<any>>
	onPointerUp?: ChannelHandler<PointerEvent<any>>
	onPointerCancel?: ChannelHandler<PointerEvent<any>>
	onGotPointerCapture?: ChannelHandler<PointerEvent<any>>
	onLostPointerCapture?: ChannelHandler<PointerEvent<any>>
	onPointerEnter?: ChannelHandler<PointerEvent<any>>
	onPointerLeave?: ChannelHandler<PointerEvent<any>>
	onPointerOver?: ChannelHandler<PointerEvent<any>>
	onPointerOut?: ChannelHandler<PointerEvent<any>>

	// Selection events
	onSelect?: ChannelHandler<SyntheticEvent<any>>

	// Touch events
	onTouchCancel?: ChannelHandler<TouchEvent<any>>
	onTouchEnd?: ChannelHandler<TouchEvent<any>>
	onTouchMove?: ChannelHandler<TouchEvent<any>>
	onTouchStart?: ChannelHandler<TouchEvent<any>>

	// UI Events
	onScroll?: ChannelHandler<UIEvent<any>>

	// Wheel events
	onWheel?: ChannelHandler<WheelEvent<any>>
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
