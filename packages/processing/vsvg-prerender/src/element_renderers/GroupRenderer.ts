import { Path } from 'd3-path'
import { SGMark, SGGroupItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { flatMap } from 'lodash'
import { copyCommonProps, assertTypeIs, emitMarkGroup } from './util'
import { renderMark } from './index'
import { rectangle } from '../path'

export class GroupRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Group

	public render(mark: SGMark<SGGroupItem>) {
		assertTypeIs(mark, GroupRenderer.TARGET_MARK_TYPE)

		return emitMarkGroup(
			MarkType.Group,
			mark.role,
			flatMap(mark.items, item => {
				const { x = 0, y = 0 } = item
				const groupRect: VSvgNode = {
					type: 'path',
					attrs: {
						d: rectangle(item, x, y).toString(),
					},
				}
				copyCommonProps(item, groupRect)

				// TODO: Use items.flatmap `children = item.items.flatMap(m => renderMap(m))`
				const children = []
				;(item.items || []).forEach(m => {
					renderMark(m).forEach(c => children.push(c))
				})
				const group: VSvgNode = {
					type: 'g',
					attrs: {
						origin: [item.x || 0, item.y || 0],
					},
					children,
				}
				copyCommonProps(item, group)
				return [groupRect, group]
			}),
		)
	}
}
