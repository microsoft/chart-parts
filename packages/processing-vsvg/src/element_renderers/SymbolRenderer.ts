/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	SGMark,
	SGSymbolItem,
	VSvgNode,
} from '@chart-parts/interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { symbol } from '../path'
import { VSvgMarkConverter, translate } from './interfaces'

export class SymbolRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Symbol

	public render(mark: SGMark<SGSymbolItem>) {
		assertTypeIs(mark, SymbolRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Symbol,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: symbol(item),
					},
					transforms: [translate(x, y)],
					metadata: item.metadata,
					channels: item.channels,
					ariaTitle: item.ariaTitle,
					ariaDescription: item.ariaDescription,
				}
				return result
			}),
		)
		return { nodes }
	}
}
