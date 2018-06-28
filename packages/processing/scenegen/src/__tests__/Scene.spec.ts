import { SGRectItem, SGMark } from '@gog/interfaces'
import { Scene } from '../scene/Scene'
import { SceneNodeBuilder, rect } from '../builder'

describe('Scene Instance', () => {
	it('can build out a basic, flat scene', () => {
		const builder = new SceneNodeBuilder()
		builder
			.scale(() => ({
				x: v => 2 * v,
			}))
			.scale(() => ({ y: v => 3 * v }))
			.mark(
				rect()
					.table('data')
					.encode({
						x: ({ index }, { x }) => x(index),
						y: ({ index }, { y }) => y(index),
					})
					.handle({
						onClick: () => 10,
					}),
			)

		const spec = builder.build()
		const data = [{}, {}, {}, {}]
		const built = new Scene(spec, {}).build({ data })

		expect(Object.keys(built.channelHandlers).length).toEqual(1)
		expect(built.root.marktype).toEqual('rect')

		const rectMark = built.root as SGMark<SGRectItem>
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
