import { MarkType, SGMark, SGLineItem } from '@markable/interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { line } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class LineRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Line

	public render(mark: SGMark<SGLineItem>) {
		assertTypeIs(mark, LineRenderer.TARGET_MARK_TYPE)

		if (mark.items.map.length === 0) {
			return { nodes: [] }
		}

		const lineItem = {
			type: 'path',
			attrs: {
				d: line(mark.items),
			},
			metadata: mark.items[0].metadata,
			channels: mark.items[0].channels,
		}
		mark.items.forEach(
			item => (lineItem.attrs = { ...lineItem.attrs, ...commonProps(item) }),
		)

		const nodes = emitMarkGroup(MarkType.Line, mark.role, [lineItem])
		return { nodes }
	}
}
