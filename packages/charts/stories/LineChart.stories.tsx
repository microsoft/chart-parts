/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { LineChartTester } from './components/LineChartTester'
import { withSvgRenderer } from './util'

storiesOf('Line Chart', module)
	.addDecorator(withKnobs)
	.addDecorator(withSvgRenderer)
	.add('Line Chart', () => <LineChartTester />)
