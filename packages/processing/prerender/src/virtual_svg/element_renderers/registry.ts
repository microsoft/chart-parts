import { VSvgNode } from '@gog/vdom-interfaces'
import { Mark } from '@gog/scenegraph'
import { MarkPrerenderer } from '../../interfaces'

const itemRendererRegistry = new Map<string, MarkPrerenderer<VSvgNode[]>>()

export function registerRenderer(
	markType: string,
	markRenderer: MarkPrerenderer<VSvgNode[]>,
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
