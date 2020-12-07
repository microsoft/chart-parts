/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DecoratorFunction } from '@storybook/addons'
import React from 'react'
import { ChartingProvider } from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'

const renderer = new Renderer()

export const withSvgRenderer: DecoratorFunction<any> = storyFn => (
	<ChartingProvider value={renderer}>{storyFn()}</ChartingProvider>
)
