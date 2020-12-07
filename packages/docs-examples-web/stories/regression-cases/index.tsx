/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { storiesOf } from '@storybook/react'
import React from 'react'
import { withSvgRenderer, withStrictMode } from '../util/decorators'
import { LogScaleLineChartRegression } from '@chart-parts/examples'

storiesOf('Regression Cases', module)
	.addDecorator(withStrictMode)
	.addDecorator(withSvgRenderer)
	.add('Log-scale Line Chart', () => <LogScaleLineChartRegression />)
