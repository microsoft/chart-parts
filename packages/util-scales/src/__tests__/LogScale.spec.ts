/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext } from '@chart-parts/interfaces'
import { LogScale } from '../quantitative/LogScale'

describe('The Log Scale', () => {
	it('can emit for a positive domain', () => {
		const scale = new LogScale()
			.name('logscale')
			.clamp(false)
			.nice(false)
			.domain('data.value')
			.range([100, 0])
			.zero()
		const { logscale } = scale.build({
			data: {
				data: [{ value: 10000000 }, { value: 100000 }, { value: 100 }],
			},
			view: {
				width: 100,
				height: 100,
			},
			scales: {},
			viewBounds: { x: [0, 100], y: [0, 100] },
		} as ScaleCreationContext)
		expect(typeof logscale).toBe('function')
		expect(logscale(100)).not.toBeNaN()
	})

	it('can emit for a negative domain', () => {
		const scale = new LogScale()
			.name('logscale')
			.clamp(false)
			.nice(false)
			.domain('data.value')
			.range([100, 0])
			.zero()
		const { logscale } = scale.build({
			data: {
				data: [{ value: -10000000 }, { value: -100000 }, { value: -100 }],
			},
			view: {
				width: 100,
				height: 100,
			},
			scales: {},
			viewBounds: { x: [0, 100], y: [0, 100] },
		} as ScaleCreationContext)
		expect(typeof logscale).toBe('function')
		expect(logscale(-100)).not.toBeNaN()
	})

	it('throws if domain crosses zero', () => {
		expect(() => {
			const scale = new LogScale()
				.name('logscale')
				.clamp(false)
				.nice(false)
				.domain('data.value')
				.range([100, 0])
				.zero()
			scale.build({
				data: {
					data: [{ value: -10000000 }, { value: 10000 }],
				},
				view: {
					width: 100,
					height: 100,
				},
				scales: {},
				viewBounds: { x: [0, 100], y: [0, 100] },
			} as ScaleCreationContext)
		}).toThrow(
			/logscale domain values must both be either positive or negative/,
		)
	})

	it('will use defalt domain and range arguments if no values are provided', () => {
		const scale = new LogScale().name('logscale')
		const { logscale } = scale.build({} as any)
		expect(logscale).toBeDefined()
		expect(logscale(1)).toBe(0)
		expect(logscale(10)).toBe(1)
	})

	it('can use an alternative base', () => {
		const scale = new LogScale().name('logscale').base(15)
		const { logscale } = scale.build({} as any)
		expect(logscale).toBeDefined()
		expect(logscale(1)).toBe(0)
		expect(logscale(10)).toBe(1)
	})
})
