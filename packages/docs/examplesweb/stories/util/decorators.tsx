/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { ChartingProvider } from '@chart-parts/react'

const svgRenderer = new Renderer()

export const withSvgRenderer = (story: any) => (
	<ChartingProvider value={svgRenderer}>{story()}</ChartingProvider>
)

export const withStrictMode = (story: any) => (
	<React.StrictMode>{story()}</React.StrictMode>
)
