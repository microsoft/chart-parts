import { Path } from 'd3-path'
import {
	SGMark,
	SGTextItem,
	MarkType,
	VerticalTextAlignment,
} from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { emitMarkGroup, copyCommonProps, assertTypeIs } from './util'
import { VSvgMarkPrerenderer } from './interfaces'

const alignments = { left: 'start', center: 'middle', right: 'end' }

function calculateTextOrigin({
	fontSize,
	baseline,
	x,
	y,
}: SGTextItem): [number, number] {
	x = x || 0
	y = y || 0
	if (VerticalTextAlignment.TOP === baseline) {
		y += fontSize
	} else if (baseline === VerticalTextAlignment.MIDDLE) {
		y += fontSize / 2
	}
	return [x, y]
}

export class TextRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Text

	public render(mark: SGMark<SGTextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Text,
			mark.role,
			mark.items.map(item => {
				const { fontSize, font, fill, fillOpacity } = item
				const origin = calculateTextOrigin(item)

				const result: VSvgNode = {
					type: 'text',
					attrs: {
						origin,
					},
					style: { fontSize, fontFamily: font },
					children: [item.text],
				}

				if (item.align) {
					result.attrs.textAnchor = alignments[item.align]
				}
				copyCommonProps(item, result)
				return result
			}),
		)
		return { nodes }
	}
}
