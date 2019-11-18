/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { LogScaleLineChartRegression } from '@chart-parts/examples'
import { withSvgRenderer, withStrictMode } from '../util/decorators'

storiesOf('Regression Cases', module)
	.addDecorator(withStrictMode)
	.addDecorator(withSvgRenderer)
	.add('Log-scale Line Chart', () => <LogScaleLineChartRegression />)
