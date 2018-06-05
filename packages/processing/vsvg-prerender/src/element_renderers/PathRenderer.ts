import { Path } from 'd3-path'
import { SGMark, SGPathItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode, VSvgTransformType } from '@gog/vdom-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { VSvgMarkPrerenderer, translate } from './interfaces'

export class PathRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Path

	public render(mark: SGMark<SGPathItem>) {
		assertTypeIs(mark, PathRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Arc,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: { ...commonProps(item), d: item.path },
					transforms: [translate(x, y)],
				}
				return result
			}),
		)
		return { nodes }
	}
}
