import { MarkType, SGMark, SGLineItem } from '@chart-parts/interfaces'
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
				...commonProps(mark.items[0]),
			},
			metadata: mark.items[0].metadata,
			channels: mark.items[0].channels,
			ariaTitle: mark.items[0].ariaTitle,
			ariaDescription: mark.items[0].ariaDescription,
		}

		const nodes = emitMarkGroup(MarkType.Line, mark.role, [lineItem])
		return { nodes }
	}
}
