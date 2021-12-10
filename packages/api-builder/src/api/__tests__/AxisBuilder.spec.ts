/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { AxisOrientation } from '@chart-parts/interfaces'
import { AxisBuilder } from '../AxisBuilder'

describe('The Axis builder', () => {
	it('throws if built with an invalid scale name or orientation', () => {
		expect(
			() => new AxisBuilder(undefined as any, AxisOrientation.Bottom),
		).toThrow()
		expect(() => new AxisBuilder('x', undefined as any)).toThrow()
	})

	it('can be constructed', () => {
		const axis = new AxisBuilder('x', AxisOrientation.Bottom)
		expect(axis).toBeDefined()

		const built = axis.build()
		expect(built).toBeDefined()
		expect(built.scale).toBe('x')
		expect(built.orient).toBe(AxisOrientation.Bottom)
		expect(built.domain).toBe(true)
		expect(built.ticks).toBe(true)
		expect(built.tickSize).toBeGreaterThan(0)
		expect(built.tickWidth).toBeGreaterThan(0)
		expect(built.domainWidth).toBeGreaterThan(0)
	})

	it('can set custom axis values', () => {
		const axis = new AxisBuilder('x', AxisOrientation.Bottom)
			.domain(false)
			.domainWidth(2)
			.domainColor('#aaa')
			.ticks(false)
			.tickColor('green')
			.tickCount(10)
			.tickOffset(1)
			.tickRound(true)
			.tickSize(10)
			.tickWidth(100)
			.bandPosition(0)
			.values([
				{ value: 10, label: 'ten' },
				{ value: 20, label: 'twenty' },
			])
			.labels(false)
			.labelFont('sans derp')
			.labelFontSize(200)
			.labelColor('#ff')
			.labelPadding(20)
			.labelFontWeight('100')
			.labelAngle(25)
			.labelFormat('%xx')

		const built = axis.build()
		expect(built).toBeDefined()
		expect(built.scale).toBe('x')
		expect(built.orient).toBe(AxisOrientation.Bottom)
		expect(built.domain).toBe(false)
		expect(built.domainWidth).toBe(2)
		expect(built.ticks).toBe(false)
		expect(built.tickColor).toBe('green')
		expect(built.tickCount).toBe(10)
		expect(built.tickOffset).toBe(1)
		expect(built.tickRound).toBe(true)
		expect(built.tickSize).toBe(10)
		expect(built.tickWidth).toBe(100)
		expect(built.bandPosition).toBe(0)
		expect(built.values as any).toHaveLength(2)
		expect(built.labels).toBe(false)
		expect(built.labelFont).toBe('sans derp')
		expect(built.labelFontSize).toBe(200)
		expect(built.labelColor).toBe('#ff')
		expect(built.labelPadding).toBe(20)
		expect(built.labelFontWeight).toBe('100')
		expect(built.labelAngle).toBe(25)
		expect(built.labelFormat).toBe('%xx')
	})
})
