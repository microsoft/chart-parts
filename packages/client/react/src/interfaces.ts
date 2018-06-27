import {
	MarkEncoding,
	ChannelHandler,
	HandlerMetadata,
} from '@gog/mark-spec-interfaces'

export type MarkEncodingProp = MarkEncoding | string | number | boolean

/**
 * Common mark-component properties
 */
export interface CommonMarkProps {
	// Data-binding
	/**
	 * The name of the data-table to bind to
	 */
	table?: string

	/**
	 * If true, emits a single item instead of one item per row in bound-data
	 */
	singleton?: boolean

	/**
	 * A helpful name for the mark
	 */
	name?: string

	/**
	 * A role description of this mark
	 */
	role?: string

	// Common Mark Value Encodings
	x?: MarkEncodingProp
	x2?: MarkEncodingProp
	xc?: MarkEncodingProp
	width?: MarkEncodingProp
	y?: MarkEncodingProp
	y2?: MarkEncodingProp
	yc?: MarkEncodingProp
	height?: MarkEncodingProp
	opacity?: MarkEncodingProp
	fill?: MarkEncodingProp
	fillOpacity?: MarkEncodingProp
	stroke?: MarkEncodingProp
	strokeOpacity?: MarkEncodingProp
	strokeWidth?: MarkEncodingProp
	strokeCap?: MarkEncodingProp
	strokeDash?: MarkEncodingProp
	strokeDashOffset?: MarkEncodingProp
	strokeJoin?: MarkEncodingProp
	strokeMiterLimit?: MarkEncodingProp
	cursor?: MarkEncodingProp
	href?: MarkEncodingProp
	tooltip?: MarkEncodingProp
	zIndex?: MarkEncodingProp

	// Events
	eventHandlers?: { [key: string]: ChannelHandler }

	// Clipboard Events
	onCopy?: ReactChannelHandler<React.ClipboardEvent<any>>
	onCut?: ReactChannelHandler<React.ClipboardEvent<any>>
	onPaste?: ReactChannelHandler<React.ClipboardEvent<any>>

	// Keyboard Events
	onKeyDown?: ReactChannelHandler<React.KeyboardEvent<any>>
	onKeyPress?: ReactChannelHandler<React.KeyboardEvent<any>>
	onKeyUp?: ReactChannelHandler<React.KeyboardEvent<any>>

	// Focus events
	onFocus?: ReactChannelHandler<React.FocusEvent<any>>
	onBlur?: ReactChannelHandler<React.FocusEvent<any>>

	// Mouse Events
	onClick?: ReactChannelHandler<React.MouseEvent<any>>
	onContextMenu?: ReactChannelHandler<React.MouseEvent<any>>
	onDoubleClick?: ReactChannelHandler<React.MouseEvent<any>>
	onDrag?: ReactChannelHandler<React.MouseEvent<any>>
	onDragEnd?: ReactChannelHandler<React.MouseEvent<any>>
	onDragEnter?: ReactChannelHandler<React.MouseEvent<any>>
	onDragExit?: ReactChannelHandler<React.MouseEvent<any>>
	onDragLeave?: ReactChannelHandler<React.MouseEvent<any>>
	onDragOver?: ReactChannelHandler<React.MouseEvent<any>>
	onDragStart?: ReactChannelHandler<React.MouseEvent<any>>
	onDrop?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseDown?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseEnter?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseLeave?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseMove?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseOut?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseOver?: ReactChannelHandler<React.MouseEvent<any>>
	onMouseUp?: ReactChannelHandler<React.MouseEvent<any>>

	// Pointer Events
	onPointerDown?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerMove?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerUp?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerCancel?: ReactChannelHandler<React.PointerEvent<any>>
	onGotPointerCapture?: ReactChannelHandler<React.PointerEvent<any>>
	onLostPointerCapture?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerEnter?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerLeave?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerOver?: ReactChannelHandler<React.PointerEvent<any>>
	onPointerOut?: ReactChannelHandler<React.PointerEvent<any>>

	// Selection events
	onSelect?: ReactChannelHandler<React.SyntheticEvent<any>>

	// Touch events
	onTouchCancel?: ReactChannelHandler<React.TouchEvent<any>>
	onTouchEnd?: ReactChannelHandler<React.TouchEvent<any>>
	onTouchMove?: ReactChannelHandler<React.TouchEvent<any>>
	onTouchStart?: ReactChannelHandler<React.TouchEvent<any>>

	// UI Events
	onScroll?: ReactChannelHandler<React.UIEvent<any>>

	// Wheel events
	onWheel?: ReactChannelHandler<React.WheelEvent<any>>
}

type ReactChannelHandler<T> = (evt: T, metadata: HandlerMetadata) => void

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
	].map(pv => transferProp(pv))
	return result
}
