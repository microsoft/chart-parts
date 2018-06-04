// tslint:disable jsx-no-array-literal-props
import React from 'react'

import { storiesOf } from '@storybook/react'
import { SingleMarkTester } from './util'
import { StrokeCap } from '@gog/mark-interfaces'

storiesOf('Mark Testers', module).add('Rule', () => {
	const initialScenegraph = {
		marktype: 'rule',
		items: [
			{
				x: 50,
				y: 50,
				x2: 100,
				y2: 100,
				stroke: '#DC143C',
				strokeWidth: 4,
				strokeCap: 'butt',
				strokeDash: [1, 0],
			},
		],
	}
	return (
		<SingleMarkTester
			initialScenegraph={initialScenegraph}
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
})
