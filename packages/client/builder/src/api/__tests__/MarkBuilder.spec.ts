/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, MarkEncodingKey } from '@chart-parts/interfaces'
import { MarkBuilder } from '../MarkBuilder'

describe('The Mark Builder', () => {
	it('can be constructed', () => {
		expect(new MarkBuilder(MarkType.Rect)).toBeDefined()
	})

	it('can have a name set', () => {
		const builder = new MarkBuilder(MarkType.Rect)
		const updatedBuilder = builder.name('my_name')
		expect(updatedBuilder).toBe(builder)

		const built = updatedBuilder.build()
		expect(built.name).toEqual('my_name')
	})

	it('can be bound to a data table', () => {
		const builder = new MarkBuilder(MarkType.Rect)
		const updatedBuilder = builder.table('my_table')
		expect(updatedBuilder).toBe(builder)

		const built = updatedBuilder.build()
		expect(built.table).toEqual('my_table')
	})

	it('can have a z-index set', () => {
		const builder = new MarkBuilder(MarkType.Rect)
		const updatedBuilder = builder.encode(MarkEncodingKey.zIndex, 3)
		expect(updatedBuilder).toBe(builder)

		const built = updatedBuilder.build()
		expect(built.encodings.zIndex).toEqual(3)
	})

	it('can unset the z-index', () => {
		const builder = new MarkBuilder(MarkType.Rect)
			.encode(MarkEncodingKey.zIndex, 3)
			.encode(MarkEncodingKey.zIndex, undefined)

		const built = builder.build()
		const zIndexEncoding = built.encodings.zIndex
		expect(zIndexEncoding).toBeUndefined()
	})

	it('can set data faceting', () => {
		const builder = new MarkBuilder(MarkType.Group)
			.table('data')
			.facet({ name: 'data_part', table: 'data', groupBy: 'x' })

		const built = builder.build()
		expect((built.facet as any).name).toEqual('data_part')
		expect((built.facet as any).groupBy).toBeDefined()
	})

	it('throws if data faceting is defined for a non-group marktype', () => {
		const builder = new MarkBuilder(MarkType.Rect).table('data')

		expect(() =>
			builder.facet({ name: 'data_part', table: 'data', groupBy: 'x' }),
		).toThrow('faceting can only be applied to "group" type marks')
	})

	describe('channel handler definition', () => {
		it('can handle channel handlers by name', () => {
			const builder = new MarkBuilder(MarkType.Rect)
				.handle('click', () => 1)
				.handle('mouseenter', () => 2)

			const built = builder.build()
			const channelKeys = Object.keys(built.channels)
			expect(channelKeys.length).toBe(2)
			expect(built.channels.click).toBeDefined()
			expect(built.channels.mouseenter).toBeDefined()
		})

		it('can handle a channel handler set', () => {
			const builder = new MarkBuilder(MarkType.Rect).handle({
				click: () => 1,
				mouseenter: () => 2,
			})

			const built = builder.build()
			const channelKeys = Object.keys(built.channels)
			expect(channelKeys.length).toBe(2)
			expect(built.channels.click).toBeDefined()
			expect(built.channels.mouseenter).toBeDefined()
		})

		it('un-sets a channel handler if set with undefined', () => {
			const mark = new MarkBuilder(MarkType.Rect)

			mark.handle('click', () => null)
			let built = mark.build()
			expect(built.channels['click']).toBeDefined()

			mark.handle('click', undefined)
			built = mark.build()
			expect(built.channels['click']).not.toBeDefined()
		})
	})

	describe('encoding definition', () => {
		it('can handle encodings by name', () => {
			const builder = new MarkBuilder(MarkType.Rect)
				.encode(MarkEncodingKey.x, () => 3)
				.encode(MarkEncodingKey.y, () => 4)
			const built = builder.build()

			expect((built.encodings as any).x(undefined, undefined)).toEqual(3)
			expect((built.encodings as any).y(undefined, undefined)).toEqual(4)
		})

		it('can unset encodings by name', () => {
			const builder = new MarkBuilder(MarkType.Rect)
				.encode(MarkEncodingKey.x, () => 3)
				.encode(MarkEncodingKey.x, undefined)
			const built = builder.build()
			expect((built.encodings as any).x).toBeUndefined()
		})

		it('can handle encodings map', () => {
			const builder = new MarkBuilder(MarkType.Rect).encode({
				x: () => 3,
				y: () => 4,
			})
			const built = builder.build()

			expect((built.encodings as any).x(undefined, undefined)).toEqual(3)
			expect((built.encodings as any).y(undefined, undefined)).toEqual(4)
		})
	})

	describe('error conditions', () => {
		it('throws if the mark types is not set when being built', () => {
			expect(() => new MarkBuilder(undefined as any).build()).toThrow(
				'mark type must be set',
			)
		})
	})
})
