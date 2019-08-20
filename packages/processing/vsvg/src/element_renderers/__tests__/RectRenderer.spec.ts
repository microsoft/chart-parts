/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable  @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { Mark } from '@chart-parts/scenegraph/dist/cjs/elements/Mark'
// @ts-ignore
import { RectItem } from '@chart-parts/scenegraph/dist/cjs/elements/items/RectItem'
import { renderMark } from '../'

describe('The Rect Renderer', () => {
	it('can render a rectangle', () => {
		const mark = new Mark()
		mark.marktype = RectItem.ITEM_TYPE
		const rect = new RectItem()
		rect.x = 0
		rect.y = 0
		rect.width = 100
		rect.height = 100
		rect.fill = 'red'
		rect.stroke = 'blue'
		mark.items.push(rect)

		const result = renderMark(mark, { nextId: () => '' })
		expect(result).toMatchSnapshot()
	})
})
