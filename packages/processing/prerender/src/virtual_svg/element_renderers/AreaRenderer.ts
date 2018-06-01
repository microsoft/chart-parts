import { Path } from 'd3-path'
import { Mark, AreaItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { area } from '../path'
import { MarkPrerenderer } from '../../interfaces'

export class AreaRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = AreaItem.ITEM_TYPE

	public render(mark: Mark<AreaItem>) {
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
