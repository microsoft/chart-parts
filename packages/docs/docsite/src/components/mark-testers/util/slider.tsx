/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { nameColumnWidth } from './constants'

const Container = styled.div`
	display: flex;
`
const NameColumn = styled.div`
	width: ${nameColumnWidth}px;
`

export interface SliderProps {
	name: string
	min?: number
	max?: number
	value?: number
	step?: number
	onChange?: (value: number | string) => void
}
const DO_NOTHING = () => null
export const Slider: React.FC<SliderProps> = memo(
	({
		name,
		min = 0,
		max = 200,
		value: defaultValue = 0,
		step = 1,
		onChange = DO_NOTHING,
	}) => {
		const [value, setValue] = useState(defaultValue)
		const handleChange = useCallback(
			evt => {
				setValue(evt.target.value)
				onChange(evt.target.value)
			},
			[onChange]
		)
		return (
			<Container>
				<NameColumn>{name}</NameColumn>
				<input
					type="range"
					name={name}
					value={value}
					min={min}
					max={max}
					step={step}
					onChange={handleChange}
				/>
				<div>{value}</div>
			</Container>
		)
	}
)
Slider.displayName = 'Slider'
