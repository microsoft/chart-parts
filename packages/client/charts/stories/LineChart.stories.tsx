/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { LineChartTester } from './components/LineChartTester'
import { withSvgRenderer } from './util'

storiesOf('Line Chart', module)
	.addDecorator(withKnobs)
	.addDecorator(withSvgRenderer)
	.add('Line Chart', () => <LineChartTester />)
