import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
`
const NameColumn = styled.div`
	width: 80px;
`
const InputColumn = styled.div`
	flex: 2;
`

export const Dropdown = ({
	name,
	value,
	options,
	onChange = (v: any) => null,
}) => {
	const handleChange = evt => onChange(evt.target.value)
	const optionDom = options.map(o => (
		<option key={o} value={o}>
			{o}
		</option>
	))
	return (
		<Container>
			<NameColumn>{name}</NameColumn>
			<InputColumn>
				<select name={name} onChange={handleChange} value={value}>
					{optionDom}
				</select>
			</InputColumn>
			<div>{value}</div>
		</Container>
	)
}
