import { Path } from 'd3-path'
import { SGMark, SGAreaItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { area } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class AreaRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Area

	public render(mark: SGMark<SGAreaItem>) {
		assertTypeIs(mark, AreaRenderer.TARGET_MARK_TYPE)
		const renderedItems: VSvgNode[] = []

		if (mark.items.map.length > 0) {
			const result: VSvgNode = {
				type: 'path',
				attrs: {
					d: area(mark.items, null).toString(),
				},
			}
			renderedItems.push(result)
		}

		return renderedItems
	}
}
