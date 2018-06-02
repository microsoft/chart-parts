import { Path } from 'd3-path'
import { SGMark, SGGroupItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { renderMark } from './index'

export class GroupRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Group

	public render(mark: SGMark<SGGroupItem>) {
		assertTypeIs(mark, GroupRenderer.TARGET_MARK_TYPE)

		return mark.items.map(item => {
			// TODO: Use items.flatmap `children = item.items.flatMap(m => renderMap(m))`
			const children = []
			;(item.items || []).forEach(m => {
				renderMark(m).forEach(c => children.push(c))
			})

			const result: VSvgNode = {
				type: 'g',
				attrs: {
					origin: [item.x || 0, item.y || 0],
				},
				children,
			}
			copyCommonProps(item, result)
			return result
		})
	}
}
