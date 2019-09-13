import React from 'react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { ChartingProvider } from '@chart-parts/react'
import { StoryDecorator } from '@storybook/react'

const renderer = new Renderer()

export const withRenderer: StoryDecorator = story => (
	<ChartingProvider value={renderer}>{story()}</ChartingProvider>
)
