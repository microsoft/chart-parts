/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'

export interface FieldSelectorProps {
	name: string
	value: string
	items: string[]
	style?: React.CSSProperties
	onChange: (value: string) => void
}

export const FieldSelector: React.FC<FieldSelectorProps> = memo(
	({ name, value, items, onChange, style }) => (
		<div style={style}>
			<span style={styles.label}>{name}</span>
			<select
				name={name}
				value={value}
				onChange={e => onChange(e.currentTarget.value)}
			>
				{items.map(f => (
					<option key={f}>{f}</option>
				))}
			</select>
		</div>
	),
)

FieldSelector.displayName = 'FieldSelector'

const styles: Record<string, React.CSSProperties> = {
	label: {
		margin: 5,
	},
}
