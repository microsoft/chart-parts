/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { nameColumnWidth } from './constants'

const Container = styled.div`
	display: flex;
`
const NameColumn = styled.div`
	width: ${nameColumnWidth}px;
`
const InputColumn = styled.div`
	flex: 2;
`

export interface DropdownProps {
	name: string
	value: string
	options: string[]
	onChange: (v: string) => void
}
const DO_NOTHING = () => null
export const Dropdown: React.FC<DropdownProps> = memo(
	({ name, value, options, onChange = DO_NOTHING }) => {
		const optionDom = useMemo(
			() =>
				options.map(o => (
					<option key={o} value={o}>
						{o}
					</option>
				)),
			[options]
		)
		return (
			<Container>
				<NameColumn>{name}</NameColumn>
				<InputColumn>
					<select
						name={name}
						onChange={useCallback(evt => onChange(evt.target.value), [
							onChange,
						])}
						value={value}
					>
						{optionDom}
					</select>
				</InputColumn>
			</Container>
		)
	}
)
Dropdown.displayName = 'Dropdown'
