/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scene, area } from '@chart-parts/builder'
import { createScenegraph } from '../index'
import { ChartOptions } from '@chart-parts/interfaces'

describe('The createScenegraph() utility', () => {
	it('can transform a scene specification into a scenegraph', () => {
		const options: ChartOptions = { width: 250, height: 250 }
		const spec = scene(
			snb =>
				snb.mark(
					area()
						.table('data')
						.encode({
							x: ({ d }) => d.x,
							y: ({ d }) => d.y,
							y2: () => 0,
						}),
				),
			options,
		).build()

		const data = [
			{ x: 1, y: 50 },
			{ x: 2, y: 40 },
			{ x: 3, y: 30 },
			{ x: 4, y: 20 },
			{ x: 5, y: 10 },
		]
		const sg = createScenegraph(spec, { data }, options)

		expect(sg).toMatchSnapshot()
	})
})
