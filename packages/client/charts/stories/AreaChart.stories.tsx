/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { AreaChartTester } from './components/AreaChartTester'
import { StackedAreaChartTester } from './components/StackedAreaChartTester'
import { withSvgRenderer } from './util'

storiesOf('Area Chart', module)
	.addDecorator(withKnobs)
	.addDecorator(withSvgRenderer)
	.add('Area Chart', () => <AreaChartTester />)
	.add('Stacked Area Chart', () => <StackedAreaChartTester />)
