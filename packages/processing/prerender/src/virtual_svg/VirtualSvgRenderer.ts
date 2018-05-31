import { Prerenderer, ChartOptions } from '../interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { Mark } from '@gog/scenegraph'
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
	public render(mark: Mark, options: ChartOptions): VSvgNode {
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
			children: renderMark(mark),
		}
		return svg
	}
}
