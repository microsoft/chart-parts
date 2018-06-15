import { SceneNodeBuilder } from '../SceneNodeBuilder'
import { MarkType } from '@gog/mark-interfaces'

describe('Scene Node Builder', () => {
	describe('error conditions', () => {
		it('throws during build() if the mark type is not set', () => {
			const builder = new SceneNodeBuilder().setTable('data')
			expect(() => builder.build()).toThrow('mark type must be set')
		})

		it('throws during build() if the mark table is not set', () => {
			const builder = new SceneNodeBuilder()
			builder.setType(MarkType.Rect)
			expect(() => builder.build()).toThrow('mark table must be set')
		})

		it('throws during build() if there are nested children and the marktype is not a group', () => {
			const builder = new SceneNodeBuilder()
			builder.setType(MarkType.Rect).setTable('data')
			const nested = builder.push()
			nested.setType(MarkType.Arc).setTable('data')

			expect(() => builder.build()).toThrow(
				'only group marks may have children',
			)
		})
	})

	it('can build a shallow scene', () => {
		const builder = new SceneNodeBuilder()
			.setType(MarkType.Rect)
			.setTable('data')
			.addScale('x', 'data', () => x => 2 * x)
			.addScale('y', 'data', () => y => 3 * y)
			.addEncoding('x', ({ row, scales: { x } }) => x(row.x))
			.addEncoding('y', ({ row, scales: { y } }) => y(row.y))
			.addChannel('onClick', () => 10)

		const node = builder.build()
		expect(node.mark.type).toEqual(MarkType.Rect)
		expect(node.mark.table).toEqual('data')
		expect(node.mark.channels.onClick).toBeDefined()
		expect(node.mark.channels.onClick({})).toEqual(10)
		expect(node.mark.encodings.x).toBeDefined()
		expect(node.mark.encodings.y).toBeDefined()
	})

	it('can build a nested scene', () => {
		const builder = new SceneNodeBuilder()
		builder.setType(MarkType.Group).setTable('data')
		const nested = builder.push()
		nested.setType(MarkType.Arc).setTable('data')

		const node = builder.build()
		expect(node.children.length).toBe(1)
	})
})
