/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { memo, useCallback } from 'react'
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

export interface ToggleProps {
	name: string
	value?: boolean
	onChange?: (value: boolean) => void
}
const DO_NOTHING = () => null
export const Toggle: React.FC<ToggleProps> = memo(function Toggle({
	name,
	value,
	onChange = DO_NOTHING,
}) {
	return (
		<Container>
			<NameColumn>{name}</NameColumn>
			<InputColumn
				type="checkbox"
				name={name}
				checked={value}
				onChange={useCallback(
					(evt) => onChange(evt.target.checked),
					[onChange]
				)}
			/>
			<div>{value}</div>
		</Container>
	)
})
