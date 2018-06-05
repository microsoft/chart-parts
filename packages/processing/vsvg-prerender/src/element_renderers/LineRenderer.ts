import { Path } from 'd3-path'
import { SGMark, SGLineItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, copyCommonProps, assertTypeIs } from './util'
import { line } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class LineRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Line

	public render(mark: SGMark<SGLineItem>) {
		assertTypeIs(mark, LineRenderer.TARGET_MARK_TYPE)

		const renderedItems: VSvgNode[] = []
		if (mark.items.map.length === 0) {
			return []
		}

		const lineItem = {
			type: 'path',
			attrs: {
				d: line(mark.items, null).toString(),
			},
		}
		mark.items.forEach(item => copyCommonProps(item, lineItem))

		return emitMarkGroup(MarkType.Line, mark.role, [lineItem])
	}
}
