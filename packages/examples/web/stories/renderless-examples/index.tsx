import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { StackedBarChart } from './StackedBarChart'
import { GroupedBarChart } from './GroupedBarChart'

storiesOf('Renderless React Examples', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Stacked Bar Chart', () => <StackedBarChart />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
