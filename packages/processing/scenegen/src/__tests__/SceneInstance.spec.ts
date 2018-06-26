import { SceneInstance } from '../SceneInstance'
import { SceneBuilder } from '../builder'
import { MarkType } from '@gog/mark-interfaces'
import { SGRectItem, SGGroupItem, SGMark } from '@gog/scenegraph-interfaces'

describe('Scene Instance', () => {
	it('can build out a basic, flat scene', () => {
		const builder = new SceneBuilder()
		builder
			.addScale('x', 'data', () => x => 2 * x)
			.addScale('y', 'data', () => y => 3 * y)
			.push()
			.setType(MarkType.Rect)
			.setTable('data')
			.addEncoding('x', ({ rowIndex, scales: { x } }) => x(rowIndex))
			.addEncoding('y', ({ rowIndex, scales: { y } }) => y(rowIndex))
			.addChannel('onClick', () => 10)
		const spec = builder.build()

		const data = [{}, {}, {}, {}]

		const built = new SceneInstance(spec, {}).build({ data })

		expect(Object.keys(built.channelHandlers).length).toEqual(1)
		expect(built.root.marktype).toEqual('group')
		expect(built.root.items.length).toEqual(1)

		const containerGroup = built.root.items[0] as SGGroupItem
		expect(containerGroup.items.length).toEqual(1)

		const rectMark = containerGroup.items[0] as SGMark<SGRectItem>
		expect(rectMark.items.length).toBe(data.length)

		// Inspect that the bound items used scales correctly
		expect(rectMark.items[0].x).toEqual(0)
		expect(rectMark.items[0].y).toEqual(0)
		expect(rectMark.items[1].x).toEqual(2)
		expect(rectMark.items[1].y).toEqual(3)
		expect(rectMark.items[2].x).toEqual(4)
		expect(rectMark.items[2].y).toEqual(6)
		expect(rectMark.items[3].x).toEqual(6)
		expect(rectMark.items[3].y).toEqual(9)
	})
})
