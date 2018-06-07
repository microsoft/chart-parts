import { Path } from 'd3-path'
import { SGMark, SGTextItem } from '@gog/scenegraph-interfaces'
import { MarkType, VerticalTextAlignment } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { VSvgMarkConverter, rotate, translate } from './interfaces'

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
	baseline,
	fontSize,
	radius = 0,
	theta = 0,
}: SGTextItem): [number, number] {
	const offsetY = offset(baseline, fontSize)
	x = x || 0
	y = (y || 0) + offsetY

	if (radius) {
		const t = theta - Math.PI / 2
		x += radius * Math.cos(t)
		y += radius * Math.sin(t)
	}
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

function getTextTransforms(item: SGTextItem) {
	const origin = calculateTextOrigin(item)
	const transforms: any[] = []
	if (item.angle !== undefined) {
		transforms.push(translate(origin[0], origin[1]), rotate(item.angle))
		if (item.dx !== undefined || item.dy !== undefined) {
			transforms.push(translate(item.dx || 0, item.dy || 0))
		}
	} else {
		transforms.push(
			translate(origin[0] + item.dx || 0, origin[1] + item.dy || 0),
		)
	}
	return transforms
}

export class TextRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Text

	public render(mark: SGMark<SGTextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Text,
			mark.role,
			mark.items.map(item => {
				const result: VSvgNode = {
					type: 'text',
					attrs: {
						...commonProps(item),
						alignmentBaseline: calculateBaseline(item.baseline),
					},
					style: {
						fontSize: item.fontSize,
						fontFamily: item.font,
						fontWeight: item.fontWeight,
						fontStyle: item.fontSize,
						fontVariant: item.fontVariant,
					},
					children: [item.text],
					transforms: getTextTransforms(item),
					metadata: item.metadata,
					channels: item.channels,
				}

				if (item.align) {
					result.attrs.textAnchor = alignments[item.align]
				}
				return result
			}),
		)
		return { nodes }
	}
}
