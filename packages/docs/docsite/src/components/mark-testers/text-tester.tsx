/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'

const TextTester: React.FC = () => (
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
			{ name: 'radius', max: 50 },
			{ name: 'theta', max: 6.28, step: 0.1 },
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
)

export default TextTester
