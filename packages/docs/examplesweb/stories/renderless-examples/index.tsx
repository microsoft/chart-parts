/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	BarChart,
	GroupedBarChart,
	LineChart,
	StackedBarChart,
} from '@chart-parts/examples'

storiesOf('Renderless React Examples', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Stacked Bar Chart', () => <StackedBarChart />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
	.add('Line Chart', () => <LineChart />)
