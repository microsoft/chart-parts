import { MarkEncoding } from '@gog/mark-spec-interfaces'

export enum Dimension {
	CHART_HEIGHT = 'chartheight',
	CHART_WIDTH = 'chartwidth',
	HEIGHT = 'height',
	WIDTH = 'width',
}

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

	// Events
	eventHandlers?: { [key: string]: (arg: any) => void }
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

export enum CategoricalColorScheme {
	category10 = 'schemeCategory10',
	accent = 'schemeAccent',
	dark2 = 'schemeDark2',
	paired = 'schemePaired',
	pastel = 'schemePastel',
	pastel2 = 'schemePastel2',
	set1 = 'schemeSet1',
	set2 = 'schemeSet2',
	set3 = 'schemeSet3',
}
