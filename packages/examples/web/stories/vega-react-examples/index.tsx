import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { StackedBarChart } from './StackedBarChart'
import { GroupGrid } from './GroupGrid'
import { GroupedBarChart } from './GroupedBarChart'

storiesOf('Vega Examples (React Pipeline)', module)
	.add('Bar Chart', () => <BarChart key="bar" />)
	.add('Stacked Bar Chart', () => <StackedBarChart key="stackedbar" />)
	.add('Grouped Bar Chart', () => <GroupedBarChart key="groupedbar" />)
	.add('Chart Grid', () => <GroupGrid key="groupedgrid" />)
