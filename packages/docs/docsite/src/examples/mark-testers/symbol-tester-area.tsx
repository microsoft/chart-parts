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

const SymbolTester: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'symbol',
			items: [
				{
					...BASE_ITEM,
					shape: 'circle',
					size: 128,
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
			{ name: 'size', min: 8, max: 10000 },
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

export default SymbolTester
