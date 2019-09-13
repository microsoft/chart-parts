/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { ChartingProvider } from '@chart-parts/react'
import {
	BarChartBuilder,
	GroupedBarChartBuilder,
	BarChartUtcBuilder,
} from '@chart-parts/examples'
import { Renderer } from '@chart-parts/react-svg-renderer'

const renderer = new Renderer()

storiesOf('Builder-Model Examples', module)
	.add('Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<BarChartBuilder />
		</ChartingProvider>
	))
	.add('Grouped Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<GroupedBarChartBuilder />
		</ChartingProvider>
	))
	.add('Bar Chart UTC Scale', () => (
		<ChartingProvider value={renderer}>
			<BarChartUtcBuilder />
		</ChartingProvider>
	))
