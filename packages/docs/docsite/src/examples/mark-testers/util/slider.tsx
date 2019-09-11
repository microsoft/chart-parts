/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import styled from 'styled-components'
import { nameColumnWidth } from './constants'

const Container = styled.div`
	display: flex;
`
const NameColumn = styled.div`
	width: ${nameColumnWidth}px;
`
const InputColumn = styled.input`
	flex: 2;
`

export interface SliderProps {
	name: string
	min?: number
	max?: number
	value?: number
	step?: number
	onChange?: (value: number | string) => void
}

export const Slider: React.SFC<SliderProps> = ({
	name,
	min = 0,
	max = 200,
	value = 0,
	step = 1,
	onChange = (v: any) => null,
}) => {
	const handleChange = (evt: any) => onChange(evt.target.value)
	return (
		<Container>
			<NameColumn>{name}</NameColumn>
			<InputColumn
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
