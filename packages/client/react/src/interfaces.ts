import { MarkEncoding } from '@gog/mark-spec-interfaces'

export enum Dimension {
	HEIGHT = 'height',
	WIDTH = 'width',
}

/**
 * Common mark-component properties
 */
export interface CommonMarkProps {
	// Common Mark Properties
	x?: MarkEncoding
	x2?: MarkEncoding
	xc?: MarkEncoding
	width?: MarkEncoding
	y?: MarkEncoding
	y2?: MarkEncoding
	yc?: MarkEncoding
	height?: MarkEncoding
	opacity?: MarkEncoding
	fill?: MarkEncoding
	fillOpacity?: MarkEncoding
	stroke?: MarkEncoding
	strokeOpacity?: MarkEncoding
	strokeWidth?: MarkEncoding
	strokeCap?: MarkEncoding
	strokeDash?: MarkEncoding
	strokeDashOffset?: MarkEncoding
	strokeJoin?: MarkEncoding
	strokeMiterLimit?: MarkEncoding
	cursor?: MarkEncoding
	href?: MarkEncoding
	tooltip?: MarkEncoding
	zIndex?: MarkEncoding

	// Event Handlers
	/**
	 * TODO: either capture all events or use a map
	 */
	onMouseEnter?: (arg: any) => void
	onMouseLeave?: (arg: any) => void
}

export function captureCommonEncodings<T extends CommonMarkProps>(props: T) {
	return {
		x: props.x,
		x2: props.x2,
		xc: props.xc,
		width: props.width,
		y: props.y,
		y2: props.y2,
		yc: props.yc,
		height: props.height,
		opacity: props.opacity,
		fill: props.fill,
		fillOpacity: props.fillOpacity,
		stroke: props.stroke,
		strokeOpacity: props.strokeOpacity,
		strokeWidth: props.strokeWidth,
		strokeCap: props.strokeCap,
		strokeDash: props.strokeDash,
		strokeDashOffset: props.strokeDashOffset,
		strokeJoin: props.strokeJoin,
		strokeMiterLimit: props.strokeMiterLimit,
		cursor: props.cursor,
		href: props.href,
		tooltip: props.tooltip,
		zIndex: props.zIndex,
	}
}
