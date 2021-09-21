/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { GroupedBarChartTester } from './components/GroupedBarChartTester'
import { InteractiveBarChartTester } from './components/InteractiveBarChartTester'
import { RotateBarChartTester } from './components/RotateBarChartTester'
import { StackedBarChartTester } from './components/StackedBarChartTester'
import { withSvgRenderer } from './util'

storiesOf('Bar Chart', module)
	.addDecorator(withKnobs)
	.addDecorator(withSvgRenderer)
	.add('Bar Chart', () => <InteractiveBarChartTester />)
	.add('Rotatable Bar Chart', () => <RotateBarChartTester />)
	.add('Grouped Bar Chart', () => <GroupedBarChartTester />)
	.add('Stacked Bar Chart', () => <StackedBarChartTester />)
