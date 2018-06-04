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

		// Pass in the origin as an array instead of a transform property to support react-native-svgs
		const svg: VSvgNode = {
			type: 'svg',
			attrs: {
				width,
				height,
				origin,
			},
			style: {
				backgroundColor,
			},
			children: [
				{
					type: 'g',
					attrs: {
						transform: `translate(30,16)`,
					},
					children: renderMark(mark),
				},
			],
		}
		return svg
	}
}
