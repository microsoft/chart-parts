/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
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
export const Dropdown: React.SFC<DropdownProps> = ({
  name,
  value,
  options,
  onChange = (v: any) => null,
}) => {
  const handleChange = (evt: any) => onChange(evt.target.value)
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
    </Container>
  )
}
