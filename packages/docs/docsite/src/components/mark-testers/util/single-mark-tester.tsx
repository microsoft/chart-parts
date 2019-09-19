/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { SGChart } from './chart'
import { Slider } from './slider'
import { Dropdown } from './dropdown'
import { Toggle } from './toggle'

export interface SingleMarkTesterState {
	scenegraph: any
}

export interface SliderSpec {
	name: string
	min?: number
	max?: number
	step?: number
}

export interface DropdownSpec {
	name: string
	options: string[]
}

export interface ToggleSpec {
	name: string
}

export interface SingleMarkTesterProps {
	initialScenegraph: any
	sliders?: SliderSpec[]
	dropdowns?: DropdownSpec[]
	toggles?: ToggleSpec[]
	chartWidth?: number
	chartHeight?: number
	chartOrigin?: [number, number]
	updateScenegraph?: (update?: any, scenegraph?: any) => any
	getParam?: (name: string, scenegraph: any) => any
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 600px;
`
const ChartContainer = styled.div`
	border: 1px solid grey;
	margin-right: 25px;
`
const ControlsContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

export const SingleMarkTester: React.FC<SingleMarkTesterProps> = memo(
	({
		sliders = [],
		dropdowns = [],
		toggles = [],
		chartWidth,
		chartHeight,
		chartOrigin,
		initialScenegraph,
		getParam: propsGetParam,
		updateScenegraph: propsUpdateScenegraph,
	}) => {
		const [scenegraph, setScenegraph] = useState(initialScenegraph)
		const getParam = useCallback(
			(name: string) => {
				return propsGetParam
					? propsGetParam(name, scenegraph)
					: scenegraph.items[0][name]
			},
			[scenegraph, propsGetParam]
		)

		const updateScenegraph = useCallback(
			(update: any) => {
				if (propsUpdateScenegraph) {
					const result = propsUpdateScenegraph(update, scenegraph)
					return result
				} else {
					return {
						...scenegraph,
						items: scenegraph.items.map((i: any) => ({ ...i, ...update })),
					}
				}
			},
			[scenegraph]
		)

		const setParam = useCallback(
			(update: any) => {
				const newsg = updateScenegraph(update)
				setScenegraph(newsg)
			},
			[updateScenegraph]
		)

		const sliderElements = sliders.map(({ name, min, max, step }) => (
			<Slider
				key={name}
				name={name}
				min={min}
				max={max}
				step={step}
				value={getParam(name)}
				onChange={v => {
					setParam({ [name]: typeof v === 'string' ? parseFloat(v) : v })
				}}
			/>
		))

		const dropdownElements = dropdowns.map(({ name, options }) => (
			<Dropdown
				key={name}
				name={name}
				options={options}
				value={getParam(name)}
				onChange={v => setParam({ [name]: v }) as any}
			/>
		))

		const toggleElements = toggles.map(({ name }) => (
			<Toggle
				key={name}
				name={name}
				value={getParam(name)}
				onChange={v => setParam({ [name]: v })}
			/>
		))

		return (
			<Container>
				<ChartContainer>
					<SGChart
						data={scenegraph}
						width={chartWidth}
						height={chartHeight}
						origin={chartOrigin}
					/>
				</ChartContainer>
				<ControlsContainer>
					{toggleElements}
					{sliderElements}
					{dropdownElements}
				</ControlsContainer>
			</Container>
		)
	}
)

SingleMarkTester.displayName = 'SingleMarkTester'
