/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { ScatterPlotTester } from './components/ScatterPlotTester'
import { withSvgRenderer } from './util'

storiesOf('ScatterPlot', module)
	.addDecorator(withKnobs)
	.addDecorator(withSvgRenderer)
	.add('Scatter Plot', () => <ScatterPlotTester />)
