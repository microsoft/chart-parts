// tslint:disable no-submodule-imports
import { Mark } from '@gog/scenegraph/lib/elements/Mark'
import { ArcItem } from '@gog/scenegraph/lib/elements/items/ArcItem'
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

		const result = renderMark(mark)
		expect(result).toMatchSnapshot()
	})
})
