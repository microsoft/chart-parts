import { Path } from 'd3-path'
import { SGMark, SGTextItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { emitMarkGroup, copyCommonProps, assertTypeIs } from './util'

const alignments = { left: 'start', center: 'middle', right: 'end' }
export class TextRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Text

	public render(mark: SGMark<SGTextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)

		return emitMarkGroup(
			MarkType.Text,
			mark.items.map(item => {
				const { fontSize, font, fill, fillOpacity } = item
				const result: VSvgNode = {
					type: 'text',
					attrs: {
						origin: [item.x || 0, item.y + item.fontSize || 0],
					},
					style: { fontSize, fontFamily: font, fill, fillOpacity },
					children: [item.text],
				}

				if (item.align) {
					result.attrs.textAnchor = alignments[item.align]
				}
				copyCommonProps(item, result)
				return result
			}),
		)
	}
}
