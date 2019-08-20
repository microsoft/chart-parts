/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { BarChart } from './BarChart'
import { GroupedBarChart } from './GroupedBarChart'
import { BarChartUtc } from './BarChartUtc'

storiesOf('Builder-Model Examples', module)
	.add('Bar Chart', () => <BarChart />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
	.add('Bar Chart UTC Scale', () => <BarChartUtc />)
