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

export enum CategoricalColorScheme {
	category10 = 'schemeCategory10',
	category20 = 'schemeAccent',
	category20b = 'schemeDark2',
	category20c = 'schemePaired',
}
