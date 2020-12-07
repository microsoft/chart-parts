/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	SGMark,
	SGRectItem,
	getItemSpace,
	VSvgNode,
} from '@chart-parts/interfaces'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
import { rectangle } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class RectRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const { metadata, channels } = item
				const space = getItemSpace(item)
				const attrs = commonProps(item)

				const rectItem = item as any
				rectItem.width = space.shape.width
				rectItem.height = space.shape.height
				attrs.d = rectangle(rectItem, space.origin.x, space.origin.y).toString()

				const result: VSvgNode = {
					type: 'path',
					attrs,
					metadata,
					channels,
					ariaTitle: item.ariaTitle,
					ariaDescription: item.ariaDescription,
				}
				return result
			}),
		)
		return { nodes }
	}
}
