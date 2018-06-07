import React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'

storiesOf('Vega Examples (React Pipeline)', module).add('Bar Chart', () => (
	<BarChart />
))
