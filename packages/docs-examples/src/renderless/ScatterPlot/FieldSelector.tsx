/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, FC, CSSProperties } from 'react'

export interface FieldSelectorProps {
	name: string
	value: string
	items: string[]
	style?: CSSProperties
	onChange: (value: string) => void
}

export const FieldSelector: FC<FieldSelectorProps> = memo(
	function FieldSelector({ name, value, items, onChange, style }) {
		return (
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
		)
	},
)

const styles: Record<string, CSSProperties> = {
	label: {
		margin: 5,
	},
}
