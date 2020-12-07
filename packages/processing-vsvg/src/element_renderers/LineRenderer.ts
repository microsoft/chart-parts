/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

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

		const firstItem = mark.items[0]
		const lineItem = {
			type: 'path',
			attrs: {
				d: line(mark.items),
				...commonProps(firstItem),
			},
			metadata: firstItem.metadata,
			channels: firstItem.channels,
			ariaTitle: firstItem.ariaTitle,
			ariaDescription: firstItem.ariaDescription,
		}

		const nodes = emitMarkGroup(MarkType.Line, mark.role, [lineItem])
		return { nodes }
	}
}
