import { Path } from 'd3-path'
import { SGMark, SGRectItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
import { rectangle } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { VSvgMarkPrerenderer } from './interfaces'

export class RectRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: rectangle(item, x, y).toString(),
					},
				}
				return result
			}),
		)
		return { nodes }
	}
}
