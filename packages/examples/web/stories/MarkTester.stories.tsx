// tslint:disable jsx-no-array-literal-props jsx-no-object-literal-props jsx-no-lambda jsx-no-lambda-props
import React from 'react'
import { storiesOf } from '@storybook/react'
import { StrokeCap } from '@gog/mark-interfaces'
import { SingleMarkTester } from './util'
import * as palette from './palette'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	fill: palette.GREY,
}

storiesOf('Mark Testers', module)
	.add('Arc', () => (
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
	))
	.add('Area', () => (
		<SingleMarkTester
			chartWidth={420}
			chartOrigin={[10, 0]}
			initialScenegraph={{
				marktype: 'area',
				items: [
					{
						x: 0,
						y: 98.18,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 80,
						y: 0,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 160,
						y: 47.27,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 240,
						y: 76.36,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 400,
						y: 25.4545,
						y2: 200,
						...BASE_ITEM,
					},
				],
			}}
		/>
	))
	.add('Group', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'group',
				items: [
					{
						clip: false,
						x: 25,
						y: 25,
						width: 150,
						height: 150,
						cornerRadius: 0,
						strokeWidth: 4,
						stroke: palette.CRIMSON,
						fill: palette.GREY,
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
	))
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
	))
	.add('Text', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'group',
				items: [
					{
						width: 200,
						height: 200,
						items: [
							{
								marktype: 'symbol',
								items: [
									{
										fill: 'firebrick',
										size: 25,
										x: 100,
										y: 100,
									},
								],
							},
							{
								marktype: 'text',
								items: [
									{
										text: 'Text Label',
										x: 100,
										y: 100,
										font: 'sans-serif',
										fontSize: 18,
										fill: 'black',
									},
								],
							},
						],
					},
				],
			}}
			sliders={[
				{ name: 'x' },
				{ name: 'y' },
				{ name: 'dx', min: -20, max: 20 },
				{ name: 'dy', min: -20, max: 20 },
				{ name: 'angle', min: -180, max: 180 },
				{ name: 'fontSize', min: 1, max: 36 },
				{ name: 'limit', min: 0, max: 150 },
			]}
			dropdowns={[
				{ name: 'align', options: ['left', 'center', 'right'] },
				{
					name: 'baseline',
					options: ['alphabetic', 'top', 'middle', 'bottom'],
				},
				{ name: 'font', options: ['sans-serif', 'serif', 'monospace'] },
				{ name: 'fontWeight', options: ['normal', 'bold'] },
				{ name: 'fontStyle', options: ['normal', 'italic'] },
			]}
			getParam={(name, scenegraph) =>
				// Get item parameters off of the textmark's first item, which is nested a bit
				scenegraph.items[0].items[1].items[0][name]
			}
			updateScenegraph={(update, scenegraph) => {
				const groupMark = scenegraph
				const firstGroup = scenegraph.items[0]
				const symbolMark = firstGroup.items[0]
				const symbolItem = symbolMark.items[0]
				const textMark = firstGroup.items[1]
				const textItem = textMark.items[0]
				return {
					...groupMark,
					items: [
						{
							...firstGroup,
							items: [
								{
									...symbolMark,
									items: [
										{
											...symbolItem,
											x: update.x || symbolItem.x,
											y: update.y || symbolItem.y,
										},
									],
								},
								{
									...textMark,
									items: [
										{
											...textItem,
											...update,
										},
									],
								},
							],
						},
					],
				}
			}}
		/>
	))
