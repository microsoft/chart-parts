/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { arc } from '../path'
import { VSvgMarkConverter, translate } from './interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { MarkType, SGMark, SGArcItem, VSvgNode } from '@chart-parts/interfaces'

export class ArcRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Arc

	public render(mark: SGMark<SGArcItem>) {
		assertTypeIs(mark, ArcRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Arc,
			mark.role,
			mark.items.map(item => {
				const { x, y } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: arc(item),
					},
					ariaTitle: item.ariaTitle,
					ariaDescription: item.ariaDescription,
					transforms: [translate(x || 0, y || 0)],
					channels: item.channels,
					metadata: item.metadata,
				}
				return result
			}),
		)
		return { nodes }
	}
}
