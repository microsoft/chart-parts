import { Prerenderer, ChartOptions } from '../interfaces'
import { VirtualDomNode } from '../../interfaces'
import { Mark } from '../..'
import { renderMark } from './element_renderers'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = 250
const DEFAULT_BG_COLOR = 'transparent'
const DEFAULT_ORIGIN = [0, 0]

/**
 * The VirtualSvgRender renders Scenegraph data into a serializable Virtual DOM.
 *
 * The Virtual Dom acts as an intermediate form that can be rendered out into many forms.
 */
export class VirtualSvgRenderer implements Prerenderer<VirtualDomNode> {
	public render(mark: Mark, options: ChartOptions): VirtualDomNode {
		const {
			width = DEFAULT_WIDTH,
			height = DEFAULT_HEIGHT,
			backgroundColor = DEFAULT_BG_COLOR,
			origin = DEFAULT_ORIGIN,
		} = options
		const transform = `translate(${origin[0]}, ${origin[1]})`
		const viewBox = `0 0 ${width} ${height}`

		const svg: VirtualDomNode = {
			type: 'svg',
			attrs: {
				width,
				height,
				transform,
				viewBox,
			},
			style: {
				'background-color': backgroundColor,
			},
			children: renderMark(mark),
		}
		return svg
	}
}
