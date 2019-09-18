/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const RuleTester: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'rule',
			items: [
				{
					x: 50,
					y: 50,
					x2: 100,
					y2: 100,
					stroke: palette.CRIMSON,
					strokeWidth: 4,
					strokeCap: 'butt',
					strokeDash: '[1,0]',
				},
			],
		}}
		sliders={[
			{ name: 'x' },
			{ name: 'y' },
			{ name: 'x2' },
			{ name: 'y2' },
			{ name: 'strokeWidth', max: 10 },
		]}
		dropdowns={[
			{ name: 'strokeCap', options: ['butt', 'round', 'square'] },
			{
				name: 'strokeDash',
				options: ['1,0', '8,8', '4,4', '4,2', '2,1', '1,1'],
			},
		]}
	/>
)

export default RuleTester
