import { Rectangle } from '../Rectangle'
import { RectItem } from '@gog/scenegraph'

describe('The Rectangle Shape', () => {
	it('can generate a simple rectangle path', () => {
		const item = new RectItem()
		item.width = 3
		item.height = 7
		const result = new Rectangle().build(item)
		expect(result.toString()).toMatchSnapshot()
	})

	it('can generate a rectangle path with a corner radius', () => {
		const item = new RectItem()
		item.width = 3
		item.height = 7
		item.cornerRadius = 2
		const result = new Rectangle().build(item)
		expect(result.toString()).toMatchSnapshot()
	})
})
