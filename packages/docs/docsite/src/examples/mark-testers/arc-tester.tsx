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

const ArcTester: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'arc',
			items: [
				{
					...BASE_ITEM,
					startAngle: -0.73,
					endAngle: 0.73,
					padAngle: 0,
					innerRadius: 0,
					outerRadius: 50,
					strokeWidth: 4,
					x: 100,
					y: 100,
				},
			],
		}}
		sliders={[
			{ name: 'x' },
			{ name: 'y' },
			{ name: 'startAngle', min: -6.28, max: 6.28, step: 0.1 },
			{ name: 'endAngle', min: -6.28, max: 6.28, step: 0.1 },
			{ name: 'padAngle', min: -6.28, max: 6.28, step: 0.1 },
			{ name: 'innerRadius', max: 100 },
			{ name: 'outerRadius', max: 100 },
			{ name: 'strokeWidth', max: 10 },
		]}
	/>
)

export default ArcTester
