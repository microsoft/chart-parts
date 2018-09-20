import {
	MarkEncoding,
	ChannelHandler,
	Gradient,
	StrokeCap,
	StrokeJoin,
} from '@chart-parts/interfaces'

export type MarkEncodingProp<T> = MarkEncoding<T> | T

/**
 * Common mark-component properties
 */
export interface CommonMarkProps {
	// Data-binding
	/**
	 * The name of the data-table to bind to. Not necessary if singleton=true
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

	/**
	 * Whether to render this mark as a singleton.
	 */
	singleton?: boolean

	// Common Mark Value Encodings
	x?: MarkEncodingProp<number>
	x2?: MarkEncodingProp<number>
	xc?: MarkEncodingProp<number>
	width?: MarkEncodingProp<number>
	y?: MarkEncodingProp<number>
	y2?: MarkEncodingProp<number>
	yc?: MarkEncodingProp<number>
	height?: MarkEncodingProp<number>
	opacity?: MarkEncodingProp<number>
	fill?: MarkEncodingProp<string | Gradient>
	fillOpacity?: MarkEncodingProp<number>
	stroke?: MarkEncodingProp<string | Gradient>
	strokeOpacity?: MarkEncodingProp<number>
	strokeWidth?: MarkEncodingProp<number>
	strokeCap?: MarkEncodingProp<StrokeCap>
	strokeDash?: MarkEncodingProp<[number, number]>
	strokeDashOffset?: MarkEncodingProp<number>
	strokeJoin?: MarkEncodingProp<StrokeJoin>
	strokeMiterLimit?: MarkEncodingProp<number>
	cursor?: MarkEncodingProp<string>
	href?: MarkEncodingProp<string>
	tooltip?: MarkEncodingProp<string>
	zIndex?: MarkEncodingProp<number>
	metadata?: MarkEncodingProp<{ [key: string]: any }>

	// Screen-Reader properties
	ariaTitle?: MarkEncodingProp<string>
	ariaDescription?: MarkEncodingProp<string>
	tabIndex?: MarkEncodingProp<number>

	// Events
	eventHandlers?: { [key: string]: ChannelHandler<any> }

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

export function captureCommonEncodings<T extends CommonMarkProps>(props: T) {
	const result: { [key: string]: any } = {}
	const transferProp = (name: string) => {
		const propVal = (props as any)[name]
		if (propVal !== undefined) {
			result[name] = propVal
		}
	}
	;[
		'x',
		'x2',
		'xc',
		'width',
		'y',
		'y2',
		'yc',
		'height',
		'opacity',
		'fill',
		'fillOpacity',
		'stroke',
		'strokeOpacity',
		'strokeWidth',
		'strokeCap',
		'strokeDash',
		'strokeDashOffset',
		'strokeJoin',
		'strokeMiterLimit',
		'cursor',
		'href',
		'tooltip',
		'zIndex',
		'ariaTitle',
		'ariaDescription',
		'tabIndex',
	].map(pv => transferProp(pv))
	return result
}
