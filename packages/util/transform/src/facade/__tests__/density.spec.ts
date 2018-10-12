/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { density, normal, uniform, kde, mixture } from '../density'
import { dataset } from '../dataset'

describe('The density() transform', () => {
	it('can generate a new normal distribution', () => {
		const ds = dataset().addTable(
			'data',
			[],
			density()
				.extent(0, 10)
				.distribution(normal()),
		)
		const generated = ds.getTable('data') as any
		expect(generated.length).toBeGreaterThan(0)
	})

	it('can generate a new uniform distribution', () => {
		const ds = dataset().addTable(
			'data',
			[],
			density()
				.distribution(
					uniform()
						.min(10)
						.max(1234),
				)
				.extent(0, 10),
		)

		const generated = ds.getTable('data') as any
		expect(generated.length).toBeGreaterThan(0)
	})

	it('can generate a new kde distribution', () => {
		const ds = dataset()
			.addTable(
				'generated',
				[],
				density()
					.distribution(
						uniform()
							.min(10)
							.max(1234),
					)
					.extent(0, 10),
			)
			.addTable(
				'kde',
				[],
				density().distribution(
					kde()
						.from('generated')
						.field('value')
						.bandwidth(3),
				),
			)

		const kdeResult = ds.getTable('kde') as any
		expect(kdeResult.length).toBeGreaterThan(0)
	})

	it('can generate a new mixture distribution', () => {
		const ds = dataset().addTable(
			'data',
			[],
			density()
				.extent(0, 10)
				.distribution(
					mixture()
						.distributions(
							normal(),
							uniform()
								.min(10)
								.max(1234),
						)
						.weights(50, 50),
				),
		)
		const generated = ds.getTable('data') as any
		expect(generated.length).toBeGreaterThan(0)
	})
})
