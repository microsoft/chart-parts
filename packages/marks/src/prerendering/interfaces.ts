import { Mark } from '../scenegraph'

/**
 * The top-level chart rendering options. This includes dimensions, scaling parameters, and
 * coloration at the top level
 */
export interface ChartOptions {
	/**
	 * The origin of the display, in pixels.
	 * The coordinate system will be translated to this point.
	 */
	origin: [number, number]

	/**
	 *  Optional scaleFactor by which to multiply the width and
	 * height to determine the final pixel size.
	 */
	scale: number

	/**
	 * The width of the chart in pixels
	 */
	width: number

	/**
	 * The height of the chart in pixels
	 */
	height: number

	/**
	 * The background color of the chart
	 */
	backgroundColor: string
}

export interface Prerenderer<IntermediateForm> {
	render(sceneGraph: Mark, options: ChartOptions): IntermediateForm
}

export interface MarkPrerenderer<IntermediateForm> {
	render(mark: Mark): IntermediateForm
}
