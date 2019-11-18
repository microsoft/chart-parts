/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { LogScale } from '../quantitative/LogScale'
import { ScaleCreationContext } from '@chart-parts/interfaces'

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
		expect(typeof logscale).toEqual('function')
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
		expect(typeof logscale).toEqual('function')
		expect(logscale(-100)).not.toBeNaN()
	})
})
