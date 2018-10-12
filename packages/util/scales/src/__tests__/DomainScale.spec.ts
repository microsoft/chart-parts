/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ScaleCreationContext } from '@chart-parts/interfaces'
import { DomainScale } from '../DomainScale'

class TestableDomainScale extends DomainScale<any> {
	public generatedDomain: any

	public createScale(arg: ScaleCreationContext) {
		const domain = this.getDomain(arg)
		this.generatedDomain = domain
		return {}
	}
}

describe('The Domain Scale', () => {
	it('can be constructed with a bound domain', () => {
		const context: ScaleCreationContext = {
			data: {
				data: [{ x: 10 }, { x: 1 }, { x: 100 }, { x: 50 }],
			},
			scales: {},
			view: {} as any,
			viewBounds: {} as any,
		}
		const scale = new TestableDomainScale().name('testable').domain('data.x')

		scale.build(context)
		expect(scale.generatedDomain).toEqual([10, 1, 100, 50])
	})

	it('can be constructed with a domain function', () => {
		const context: ScaleCreationContext = {
			data: {
				data: [{ x: 10 }, { x: 1 }, { x: 100 }, { x: 50 }],
			},
			scales: {},
			view: {} as any,
			viewBounds: {} as any,
		}
		const scale = new TestableDomainScale()
			.name('testable')
			.domain((arg: any) => arg.data.data.map((d: any) => d.x))

		scale.build(context)
		expect(scale.generatedDomain).toEqual([10, 1, 100, 50])
	})

	it('can be constructed with a domain value', () => {
		const context: ScaleCreationContext = {
			data: {
				data: [{ x: 10 }, { x: 1 }, { x: 100 }, { x: 50 }],
			},
			scales: {},
			view: {} as any,
			viewBounds: {} as any,
		}
		const scale = new TestableDomainScale().name('testable').domain([0, 100])

		scale.build(context)
		expect(scale.generatedDomain).toEqual([0, 100])
	})
})
