/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Mark, ArcItem } from '@chart-parts/scenegraph'
import { renderMark } from '../'

describe('The Arc Renderer', () => {
	it('can render an arc', () => {
		const mark = new Mark()
		mark.marktype = ArcItem.ITEM_TYPE

		const arc = new ArcItem()
		arc.startAngle = 0
		arc.endAngle = 1
		arc.innerRadius = 30
		arc.outerRadius = 100
		arc.width = 100
		arc.height = 100
		arc.fill = 'red'
		arc.stroke = 'blue'
		mark.items.push(arc)

		const result = renderMark(mark, { nextId: () => 'id' })
		expect(result).toMatchSnapshot()
	})
})
