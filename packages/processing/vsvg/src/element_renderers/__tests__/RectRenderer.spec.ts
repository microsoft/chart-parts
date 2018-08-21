// tslint:disable no-submodule-imports no-implicit-dependencies
import { Mark } from '@markable/scenegraph/lib/elements/Mark'
import { RectItem } from '@markable/scenegraph/lib/elements/items/RectItem'
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
