import { Path } from 'd3-path'
import { SGMark, SGRectItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { rectangle } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RectRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		// Render each item embedded in this mark
		const renderedItems: VSvgNode[] = mark.items.map(item => {
			const result: VSvgNode = {
				type: 'path',
				attrs: { d: rectangle(item).toString() },
			}
			copyCommonProps(item, result)
			return result
		})

		return renderedItems
	}
}
