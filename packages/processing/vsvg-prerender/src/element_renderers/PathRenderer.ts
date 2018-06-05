import { Path } from 'd3-path'
import { SGMark, SGPathItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { VSvgMarkPrerenderer } from './interfaces'

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
					attrs: {
						d: item.path,
						// TODO: turn into transform downstream?
						origin: [x || 0, y || 0],
					},
				}
				copyCommonProps(item, result)
				return result
			}),
		)
		return { nodes }
	}
}
