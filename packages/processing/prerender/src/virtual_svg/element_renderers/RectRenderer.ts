import { Path } from 'd3-path'
import { Mark, RectItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { rectangle } from '../path/shapes'
import { MarkPrerenderer } from '../../interfaces'

export class RectRenderer implements MarkPrerenderer<VSvgNode[]> {
	public render(mark: Mark) {
		assertTypeIs(mark, RectItem.ITEM_TYPE)

		// Render each item embedded in this mark
		const renderedItems: VSvgNode[] = mark.items.map((item: RectItem) => {
			const rendered = rectangle(item)
			const result: VSvgNode = {
				type: 'path',
				attrs: { d: rendered.toString() },
			}
			copyCommonProps(item, result)
			return result
		})

		return renderedItems
	}
}
