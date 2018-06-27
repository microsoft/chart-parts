import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { GroupedBarChart } from './GroupedBarChart'

storiesOf('Builder-Model Examples', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
