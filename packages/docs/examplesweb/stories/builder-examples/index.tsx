/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	BarChartBuilder,
	GroupedBarChartBuilder,
	BarChartUtcBuilder,
} from '@chart-parts/examples'

storiesOf('Builder-Model Examples', module)
	.add('Bar Chart', () => <BarChartBuilder />)
	.add('Grouped Bar Chart', () => <GroupedBarChartBuilder />)
	.add('Bar Chart UTC Scale', () => <BarChartUtcBuilder />)
