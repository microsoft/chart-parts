import { MarkPrerenderer } from '../../interfaces'
import { VirtualDomNode } from '../../../interfaces'
import { Mark } from '../../..'

const itemRendererRegistry = new Map<
	string,
	MarkPrerenderer<VirtualDomNode[]>
>()

export function registerRenderer(
	markType: string,
	markRenderer: MarkPrerenderer<VirtualDomNode[]>,
) {
	itemRendererRegistry.set(markType, markRenderer)
}

export function renderMark(mark: Mark) {
	if (!mark.marktype) {
		throw new Error(`Unhandled mark type "${mark.marktype}"`)
	}
	const renderer = itemRendererRegistry.get(mark.marktype)
	return renderer ? renderer.render(mark) : []
}
