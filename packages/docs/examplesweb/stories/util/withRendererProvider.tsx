/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { ChartingProvider } from '@chart-parts/react'
import { StoryDecorator } from '@storybook/react'

const renderer = new Renderer()

export const withRenderer: StoryDecorator = story => (
	<ChartingProvider value={renderer}>{story()}</ChartingProvider>
)
