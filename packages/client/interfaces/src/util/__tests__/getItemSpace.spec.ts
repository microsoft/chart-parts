/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
declare const require: any
const {
	RectItem,
} = require('@chart-parts/scenegraph/dist/cjs/elements/items/RectItem')
import { getItemSpace } from '../getItemSpace'

xdescribe('Rendering Utilities', () => {
	describe('getItemSpace', () => {
		it('cannot compute width/height with insufficient information', () => {
			const item = new RectItem()
			item.x = 10
			item.y = 80
			const space = getItemSpace(item)
			expect(space.origin.x).toEqual(10)
			expect(space.origin.y).toEqual(80)
			expect(space.shape.width).toBeUndefined()
			expect(space.shape.height).toBeUndefined()
		})

		it('cannot compute origin with insufficient information', () => {
			const item = new RectItem()
			item.x2 = 10
			item.y2 = 80
			const space = getItemSpace(item)
			expect(space.origin.x).toEqual(0)
			expect(space.origin.y).toEqual(0)
			expect(space.shape.width).toBeUndefined()
			expect(space.shape.height).toBeUndefined()
		})

		it('can compute width using x and x2', () => {
			const item = new RectItem()
			item.x = 10
			item.x2 = 80
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(70)
			expect(space.origin.x).toEqual(10)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using x and x2 inverted', () => {
			const item = new RectItem()
			item.x = 80
			item.x2 = 10
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(70)
			expect(space.origin.x).toEqual(10)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using x and xc', () => {
			const item = new RectItem()
			item.x = 10
			item.xc = 80
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(140)
			expect(space.origin.x).toEqual(10)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using x and xc inverted', () => {
			const item = new RectItem()
			item.x = 80
			item.xc = 10
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(140)
			expect(space.origin.x).toEqual(10)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using x and width', () => {
			const item = new RectItem()
			item.x = 10
			item.width = 100
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(100)
			expect(space.origin.x).toEqual(10)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using x2 and width', () => {
			const item = new RectItem()
			item.x2 = 80
			item.width = 100
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(100)
			expect(space.origin.x).toEqual(-20)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using xc and width', () => {
			const item = new RectItem()
			item.xc = 50
			item.width = 20
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(20)
			expect(space.origin.x).toEqual(40)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using xc and x2', () => {
			const item = new RectItem()
			item.xc = 50
			item.x2 = 70
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(40)
			expect(space.origin.x).toEqual(30)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute width using xc and x2 inverted', () => {
			const item = new RectItem()
			item.xc = 50
			item.x2 = 20
			const space = getItemSpace(item)
			expect(space.shape.width).toEqual(60)
			expect(space.origin.x).toEqual(20)
			expect(space.shape.height).toBeUndefined()
			expect(space.origin.y).toEqual(0)
		})

		it('can compute height using y and y', () => {
			const item = new RectItem()
			item.y = 10
			item.y2 = 80
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(70)
			expect(space.origin.y).toEqual(10)
		})

		it('can compute height using y and y2 inverted', () => {
			const item = new RectItem()
			item.y = 80
			item.y2 = 10
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(70)
			expect(space.origin.y).toEqual(10)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using y and yc', () => {
			const item = new RectItem()
			item.y = 10
			item.yc = 80
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(140)
			expect(space.origin.y).toEqual(10)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using y and yc inverted', () => {
			const item = new RectItem()
			item.y = 80
			item.yc = 10
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(140)
			expect(space.origin.y).toEqual(10)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using y and height', () => {
			const item = new RectItem()
			item.y = 10
			item.height = 100
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(100)
			expect(space.origin.y).toEqual(10)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using y2 and height', () => {
			const item = new RectItem()
			item.y2 = 80
			item.height = 100
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(100)
			expect(space.origin.y).toEqual(-20)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using yc and height', () => {
			const item = new RectItem()
			item.yc = 50
			item.height = 20
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(20)
			expect(space.origin.y).toEqual(40)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using yc and y2', () => {
			const item = new RectItem()
			item.yc = 50
			item.y2 = 70
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(40)
			expect(space.origin.y).toEqual(30)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})

		it('can compute height using yc and y2 inverted', () => {
			const item = new RectItem()
			item.yc = 50
			item.y2 = 20
			const space = getItemSpace(item)
			expect(space.shape.height).toEqual(60)
			expect(space.origin.y).toEqual(20)
			expect(space.shape.width).toBeUndefined()
			expect(space.origin.x).toEqual(0)
		})
	})
})
