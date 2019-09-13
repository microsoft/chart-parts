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

const RectTester: React.FC = () => (
	<SingleMarkTester
		initialScenegraph={{
			marktype: 'rect',
			items: [
				{
					...BASE_ITEM,
					x: 50,
					y: 50,
					width: 75,
					height: 75,
					cornerRadius: 0,
					stroke: palette.CRIMSON,
					fill: palette.GREY,
					strokeWidth: 4,
				},
			],
		}}
		sliders={[
			{ name: 'x' },
			{ name: 'y' },
			{ name: 'width' },
			{ name: 'height' },
			{ name: 'cornerRadius', max: 15 },
			{ name: 'strokeWidth', max: 10 },
		]}
	/>
)

export default RectTester
