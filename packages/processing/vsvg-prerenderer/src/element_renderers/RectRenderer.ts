import { Path } from 'd3-path'
import { Mark, RectItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { rectangle } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RectRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = RectItem.ITEM_TYPE

	public render(mark: Mark<RectItem>) {
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
