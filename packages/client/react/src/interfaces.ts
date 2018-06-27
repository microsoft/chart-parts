import { MarkEncoding } from '@gog/mark-spec-interfaces'

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
