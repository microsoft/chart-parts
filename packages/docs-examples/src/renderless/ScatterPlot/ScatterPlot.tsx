/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useState, CSSProperties, FC } from 'react'
import { FieldSelector } from './FieldSelector'
import { ScatterPlotChart } from './ScatterPlotChart'

const FIELDS = [
	'IMDB_Rating',
	'Rotten_Tomatoes_Rating',
	'US_Gross',
	'Worldwide_Gross',
]

const styles: { [key: string]: CSSProperties } = {
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	fields: {
		marginLeft: 15,
	},
}

export const ScatterPlot: FC = memo(function ScatterPlot() {
	const [yField, setYField] = useState(FIELDS[0])
	const [xField, setXField] = useState(FIELDS[1])

	return (
		<div style={styles.container}>
			<div>
				<ScatterPlotChart xField={xField} yField={yField} />
			</div>
			<div style={styles.fields}>
				<FieldSelector
					name="xField"
					value={xField}
					items={FIELDS}
					onChange={setXField}
				/>
				<FieldSelector
					name="yField"
					value={yField}
					items={FIELDS}
					onChange={setYField}
				/>
			</div>
		</div>
	)
})
