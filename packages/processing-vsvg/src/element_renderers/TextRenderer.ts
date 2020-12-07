/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	SGMark,
	SGTextItem,
	MarkType,
	VerticalTextAlignment,
	VSvgNode,
} from '@chart-parts/interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { VSvgMarkConverter, rotate, translate } from './interfaces'

const alignments = { left: 'start', center: 'middle', right: 'end' }
const DEFAULT_FONT_SIZE = 11
const DEFAULT_FONT_FAMILY = 'sans-serif'

function calculateTextOrigin({
	x,
	y,
	// TODO: use these?
	// baseline,
	// fontSize,
	radius = 0,
	theta = 0,
}: SGTextItem): [number, number] {
	x = x || 0
	y = y || 0

	if (radius) {
		const t = theta - Math.PI / 2
		x += radius * Math.cos(t)
		y += radius * Math.sin(t)
	}
	return [x, y]
}

function calculateBaseline(alignment: VerticalTextAlignment | undefined) {
	switch (alignment) {
		case VerticalTextAlignment.Top:
			return 'hanging'
		case VerticalTextAlignment.Middle:
			return 'central'
		case VerticalTextAlignment.Bottom:
			return 'baseline'
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
			translate(
				origin[0] + (item.dx || 0) || 0,
				origin[1] + (item.dy || 0) || 0,
			),
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
				const attrs = {
					...commonProps(item),
					alignmentBaseline: calculateBaseline(item.baseline),
				}

				if (item.align) {
					attrs.textAnchor = alignments[item.align]
				}
				const children = item.text !== undefined ? ['' + item.text] : undefined
				const result: VSvgNode = {
					type: 'text',
					attrs,
					style: {
						fontSize: item.fontSize || DEFAULT_FONT_SIZE,
						fontFamily: item.font || DEFAULT_FONT_FAMILY,
						fontWeight: item.fontWeight,
						fontStyle: item.fontStyle,
						fontVariant: item.fontVariant,
					},
					transforms: getTextTransforms(item),
					metadata: item.metadata,
					channels: item.channels,
					ariaTitle: item.ariaTitle,
					ariaDescription: item.ariaDescription,
					children,
				}

				return result
			}),
		)
		return { nodes }
	}
}
