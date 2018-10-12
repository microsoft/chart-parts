/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { StackedBarChart } from './StackedBarChart'
import { GroupedBarChart } from './GroupedBarChart'
import { LineChart } from './LineChart'

storiesOf('Renderless React Examples', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Stacked Bar Chart', () => <StackedBarChart />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
	.add('Line Chart', () => <LineChart />)
