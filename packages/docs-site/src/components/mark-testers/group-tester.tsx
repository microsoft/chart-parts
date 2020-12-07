/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	fill: palette.GREY,
}

const GroupTester: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'group',
			items: [
				{
					...BASE_ITEM,
					clip: false,
					x: 25,
					x2: 150,
					y: 25,
					y2: 150,
					width: 150,
					height: 150,
					cornerRadius: 0,
					strokeWidth: 4,
					items: [
						{
							marktype: 'rect',
							items: [
								{
									x: 75,
									y: -10,
									width: 10,
									height: 20,
									stroke: palette.CRIMSON,
									strokeWidth: 2,
									fill: 'white',
								},
								{
									x: -5,
									y: 50,
									width: 50,
									height: 50,
									stroke: palette.CRIMSON,
									strokeWidth: 2,
									fill: 'white',
								},
								{
									x: 100,
									y: 100,
									width: 75,
									height: 85,
									stroke: palette.CRIMSON,
									strokeWidth: 2,
									fill: 'white',
								},
							],
						},
					],
				},
			],
		}}
		toggles={[{ name: 'clip' }]}
		sliders={[
			{ name: 'x' },
			{ name: 'y' },
			{ name: 'width', min: 25, max: 150 },
			{ name: 'height', min: 25, max: 150 },
			{ name: 'cornerRadius', max: 20 },
			{ name: 'strokeWidth', max: 10 },
		]}
	/>
)

export default GroupTester
