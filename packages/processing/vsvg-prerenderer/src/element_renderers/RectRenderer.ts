import { Path } from 'd3-path'
import { SGMark, SGRectItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs, emitMarkGroup } from './util'
import { rectangle } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RectRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		return emitMarkGroup(
			MarkType.Rect,
			mark.items.map(item => {
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						d: rectangle(item).toString(),
						// origin: [item.x || 0, item.y || 0],
					},
				}
				copyCommonProps(item, result)
				return result
			}),
		)
	}
}
