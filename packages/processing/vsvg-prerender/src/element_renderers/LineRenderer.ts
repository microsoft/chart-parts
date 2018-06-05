import { Path } from 'd3-path'
import { SGMark, SGLineItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { line } from '../path'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { VSvgMarkPrerenderer } from './interfaces'

export class LineRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Line

	public render(mark: SGMark<SGLineItem>) {
		assertTypeIs(mark, LineRenderer.TARGET_MARK_TYPE)

		const renderedItems: VSvgNode[] = []
		if (mark.items.map.length === 0) {
			return { nodes: [] }
		}

		const lineItem = {
			type: 'path',
			attrs: {
				d: line(mark.items, null).toString(),
			},
		}
		mark.items.forEach(
			item => (lineItem.attrs = { ...lineItem.attrs, ...commonProps(item) }),
		)

		const nodes = emitMarkGroup(MarkType.Line, mark.role, [lineItem])
		return { nodes }
	}
}
