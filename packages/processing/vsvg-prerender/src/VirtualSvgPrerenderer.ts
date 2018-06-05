import { SGMark } from '@gog/mark-interfaces'
import { Prerenderer, ChartOptions } from '@gog/prerender-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { renderMark } from './element_renderers'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = 250
const DEFAULT_BG_COLOR = 'transparent'
const DEFAULT_ORIGIN: [number, number] = [0, 0]

/**
 * The VirtualSvgRender renders Scenegraph data into a serializable Virtual DOM.
 *
 * The Virtual Dom acts as an intermediate form that can be rendered out into many forms.
 */
export class VirtualSvgRenderer implements Prerenderer<VSvgNode> {
	public render(mark: SGMark<any>, options: ChartOptions): VSvgNode {
		const {
			width = DEFAULT_WIDTH,
			height = DEFAULT_HEIGHT,
			backgroundColor = DEFAULT_BG_COLOR,
			origin = DEFAULT_ORIGIN,
		} = options
		const [x = 0, y = 0] = origin

		// Create the rendering Context
		let id = 0
		const context = {
			nextId: () => `${++id}`,
		}

		// Get the rendering of the root mark
		const root = renderMark(mark, context)

		// Wrap the rendered root in an SVG
		const svg: VSvgNode = {
			type: 'svg',
			attrs: {
				width: width + x,
				height: height + y,
			},
			style: {
				backgroundColor,
			},
			children: [
				{
					type: 'defs',
					attrs: {},
					children: root.defs,
				},
				{
					type: 'g',
					attrs: {
						origin,
					},
					children: root.nodes,
				},
			],
		}
		return svg
	}
}
