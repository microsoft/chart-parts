/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { SceneBuilder } from '@chart-parts/builder'

export const SceneBuilderContext = React.createContext<
	SceneBuilder | undefined
>(undefined)
