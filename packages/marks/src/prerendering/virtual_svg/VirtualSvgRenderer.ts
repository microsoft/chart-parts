import { Prerenderer, ChartOptions } from '../interfaces'
import { VirtualDomNode } from '../../interfaces'
import { Mark } from '../..'
import { renderMark } from './element_renderers'

/**
 * The VirtualSvgRender renders Scenegraph data into a serializable Virtual DOM.
 *
 * The Virtual Dom acts as an intermediate form that can be rendered out into many forms.
 */
export class VirtualSvgRenderer implements Prerenderer<VirtualDomNode> {
	public render(mark: Mark, options: ChartOptions): VirtualDomNode {
		const svg: VirtualDomNode = {
			type: 'svg',
			attrs: { width: 250, height: 250 },
			children: renderMark(mark),
		}
		return svg
	}
}
