import { RectRenderer } from '../RectRenderer'
import { Mark, RectItem } from '../../../../../scenegraph'

describe('The Rect Rendered', () => {
	it('can render a rectangle', () => {
		const mark = new Mark()
		mark.marktype = RectItem.ITEM_TYPE
		const rect = new RectItem()
		rect.x = 0
		rect.y = 0
		rect.width = 100
		rect.height = 100
		mark.items.push(rect)

		const renderer = new RectRenderer()
		const result = renderer.render(mark)
		console.log('Render Result', result)
	})
})
