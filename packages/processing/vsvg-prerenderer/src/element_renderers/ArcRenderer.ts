import { Path } from 'd3-path'
import { Mark, ArcItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { arc } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class ArcRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = ArcItem.ITEM_TYPE

	public render(mark: Mark<ArcItem>) {
		assertTypeIs(mark, ArcRenderer.TARGET_MARK_TYPE)

		// Render each item embedded in this mark
		const renderedItems: VSvgNode[] = mark.items.map(item => {
			const { x = 0, y = 0 } = item
			const result: VSvgNode = {
				type: 'path',
				attrs: {
					d: arc(item, null).toString(),
					// TODO: turn into transform downstream?
					origin: [x, y],
				},
			}
			copyCommonProps(item, result)
			return result
		})

		return renderedItems
	}
}
