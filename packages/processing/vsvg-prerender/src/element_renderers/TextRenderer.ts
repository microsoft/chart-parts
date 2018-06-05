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
const DEFAULT_FONT_SIZE = 11

/**
 * Calculate vertical offset based on baseline (thanks, Vega!)
 * @param baseline
 * @param fontSize
 */
function offset(
	baseline: VerticalTextAlignment,
	height: number = DEFAULT_FONT_SIZE,
) {
	// perform our own font baseline calculation
	// why? not all browsers support SVG 1.1 'alignment-baseline' :(
	if (baseline === VerticalTextAlignment.TOP) {
		return 0.79 * height
	} else if (baseline === VerticalTextAlignment.MIDDLE) {
		return 0.3 * height
	} else if (baseline === VerticalTextAlignment.BOTTOM) {
		return -0.32 * height
	} else {
		return 0
	}
}

function calculateTextOrigin({
	x,
	y,
	dx,
	dy,
	baseline,
	fontSize,
}: SGTextItem): [number, number] {
	const offsetY = offset(baseline, fontSize)
	x = (x || 0) + (dx || 0)
	y = (y || 0) + (dy || 0) + offsetY
	return [x, y]
}

function calculateBaseline(alignment: VerticalTextAlignment) {
	switch (alignment) {
		case VerticalTextAlignment.MIDDLE:
			return 'central'
		default:
			return undefined
	}
}

export class TextRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Text

	public render(mark: SGMark<SGTextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Text,
			mark.role,
			mark.items.map(item => {
				const {
					fontSize,
					font,
					fill,
					fillOpacity,
					fontWeight,
					fontStyle,
					fontVariant,
					baseline,
					angle: rotation,
				} = item

				// Determine the text origin to use
				const result: VSvgNode = {
					type: 'text',
					attrs: {
						origin: calculateTextOrigin(item),
						alignmentBaseline: calculateBaseline(baseline),
						rotation,
					},
					style: {
						fontSize,
						fontFamily: font,
						fontWeight,
						fontStyle,
						fontVariant,
					},
					children: [item.text],
				}

				if (item.align) {
					result.attrs.textAnchor = alignments[item.align] || 'start'
				}
				copyCommonProps(item, result)
				return result
			}),
		)
		return { nodes }
	}
}
