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

const SymbolTesterWidth: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'symbol',
			items: [
				{
					...BASE_ITEM,
					shape: 'circle',
					width: 10,
					x: 100,
					y: 100,
					fill: 'red',
					stroke: 'green',
					strokeWidth: 1,
				},
			],
		}}
		sliders={[
			{ name: 'x' },
			{ name: 'y' },
			{ name: 'width', min: 1, max: 100 },
			{ name: 'strokeWidth' },
		]}
		dropdowns={[
			{
				name: 'shape',
				options: [
					'circle',
					'cross',
					'diamond',
					'square',
					'triangle-up',
					'triangle-down',
					'triangle-left',
					'triangle-right',
				],
			},
		]}
	/>
)

export default SymbolTesterWidth
