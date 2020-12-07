/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SceneNodeBuilder } from '@chart-parts/builder'
import { Renderer, VSvgNode } from '@chart-parts/interfaces'

/**
 * A context value for the current scene-node. This is mainly used
 * internally by the React components to interact with the builder API.
 * @ignore
 */
export const SceneBuilderContext = React.createContext<
	SceneNodeBuilder | undefined
>(undefined)

/**
 * A context value for the charting renderer to use. This should
 * appear above any charts.
 * @ignore.
 */
export const ChartRendererContext = React.createContext<
	Renderer<VSvgNode, any> | undefined
>(undefined)
