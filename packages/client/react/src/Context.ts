/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SceneNodeBuilder } from '@chart-parts/builder'
import { Renderer, VSvgNode } from '@chart-parts/interfaces'

export const SceneBuilderContext = React.createContext<
	SceneNodeBuilder | undefined
>(undefined)

export const ChartRendererContext = React.createContext<
	Renderer<VSvgNode, any> | undefined
>(undefined)
