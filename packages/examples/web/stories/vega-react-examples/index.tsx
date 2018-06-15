import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { StackedBarChart } from './StackedBarChart'
import { GroupGrid } from './GroupGrid'

storiesOf('Vega Examples (React Pipeline)', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Stacked Bar Chart', () => <StackedBarChart />)
	.add('Chart Grid', () => <GroupGrid />)
