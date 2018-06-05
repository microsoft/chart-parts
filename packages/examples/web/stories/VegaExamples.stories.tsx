// tslint:disable jsx-no-array-literal-props
import React from 'react'

import { storiesOf } from '@storybook/react'
import { StrokeCap } from '@gog/mark-interfaces'
import { Chart } from './util'
import { BarChart, StackedAreaChart } from '@gog/testdata'

storiesOf('Vega Examples', module)
	.add('Bar Chart', () => (
		<Chart
			data={BarChart.scenegraph}
			height={220}
			width={400}
			origin={[30, 19]}
		/>
	))
	.add('Stacked Area Chart', () => (
		<Chart
			data={StackedAreaChart.scenegraph}
			height={220}
			width={400}
			origin={[30, 19]}
		/>
	))
