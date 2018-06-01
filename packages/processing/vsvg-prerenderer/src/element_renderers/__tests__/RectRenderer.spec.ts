import { Mark, RectItem } from '@gog/scenegraph'
import { RectRenderer } from '../RectRenderer'

describe('The Rect Rendered', () => {
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

		const renderer = new RectRenderer()
		const result = renderer.render(mark)

		const output = document.createElement('svg')
		output.setAttribute('width', '250')
		output.setAttribute('height', '250')

		const markElement = document.createElement(result[0].element)
		Object.keys(result[0].attrs).map(attr =>
			markElement.setAttribute(attr, result[0].attrs[attr]),
		)
		output.appendChild(markElement)

		expect(output.outerHTML).toMatchSnapshot()
	})
})
