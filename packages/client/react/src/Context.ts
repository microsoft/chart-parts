/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SceneNodeBuilder } from '@chart-parts/builder'

export const SceneNodeBuilderContext = React.createContext<
	SceneNodeBuilder | undefined
>(undefined)
