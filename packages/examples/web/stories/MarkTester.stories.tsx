// tslint:disable jsx-no-array-literal-props jsx-no-object-literal-props
import React from 'react'
import { storiesOf } from '@storybook/react'
import { SingleMarkTester } from './util'
import { StrokeCap } from '@gog/mark-interfaces'
import * as palette from './palette'

storiesOf('Mark Testers', module)
	.add('Rect', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'rect',
				items: [
					{
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
			dropdowns={[]}
		/>
	))
	.add('Rule', () => (
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
						strokeDash: [1, 0],
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
	))
