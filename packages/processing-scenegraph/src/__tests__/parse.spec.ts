/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { GroupItem } from '../elements'
import { parseScene } from '../parse'
import barley from './barley.json'

describe('The Scenegraph Parser', () => {
	it('can parse a scene object', () => {
		const result = parseScene({
			marktype: 'rect',
			items: [
				{ x: 0, y: 0, width: 50, height: 50, fill: 'steelblue' },
				{ x: 100, y: 50, width: 50, height: 50, fill: 'firebrick' },
				{ x: 50, y: 100, width: 50, height: 50, fill: 'forestgreen' },
			],
		})

		expect(result).toBeDefined()
		expect(result.marktype).toBe('rect')
		expect(result.nodetype).toBe('mark')
		expect(result.items).toHaveLength(3)
		result.items.forEach(t => {
			expect(t.itemtype).toBe('rect')
			expect(t.parent).toBe(result)
			expect(t.parentType).toBe('mark')
		})
	})

	it('can parse a scene object with a group', () => {
		const input = {
			marktype: 'group',
			items: [
				{
					x: 0,
					y: 0,
					width: 200,
					height: 200,
					items: [
						{
							marktype: 'rect',
							items: [
								{ x: 0, y: 0, width: 50, height: 50, fill: 'steelblue' },
								{ x: 100, y: 50, width: 50, height: 50, fill: 'firebrick' },
								{ x: 50, y: 100, width: 50, height: 50, fill: 'forestgreen' },
							],
						},
					],
				},
			],
		}
		const scene = parseScene(input)
		expect(scene.marktype).toBe('group')
		expect(scene.items[0].itemtype).toBe('group')

		const group = scene.items[0] as GroupItem
		expect(group.items).toHaveLength(1)
		expect(group.items[0].marktype).toBe('rect')
	})

	it('can parse a complex scene', () => {
		const scene = parseScene(barley)
		expect(scene).toBeDefined()
	})
})
