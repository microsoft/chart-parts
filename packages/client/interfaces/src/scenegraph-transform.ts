import { SGMark } from './scenegraph'

export interface PaddingObject {
	top?: number
	right?: number
	bottom?: number
	left?: number
}

/**
 * The top-level chart rendering options. This includes dimensions, scaling parameters, and
 * coloration at the top level
 */
export interface ChartOptions {
	/**
	 * The origin of the display, in pixels.
	 * The coordinate system will be translated to this point.
	 */
	origin?: [number, number]

	/**
	 *  Optional scaleFactor by which to multiply the width and
	 * height to determine the final pixel size.
	 */
	scale?: number

	/**
	 * The width of the chart in pixels
	 */
	width?: number

	/**
	 * The height of the chart in pixels
	 */
	height?: number

	/**
	 * The background color of the chart
	 */
	backgroundColor?: string

	/**
	 * Padding to apply to the chartw
	 */
	padding?: number | PaddingObject

	/**
	 * A title to apply to the chart, for screen-reader users
	 */
	title?: string

	/**
	 * A description to apply to the chart, for screen-reader users
	 */
	description?: string
}

export interface ScenegraphConverter<IntermediateForm> {
	render(sceneGraph: SGMark<any>, options: ChartOptions): IntermediateForm
}

export interface MarkConverter<IntermediateForm, Context> {
	render(mark: SGMark<any>, context: Context): IntermediateForm
}
