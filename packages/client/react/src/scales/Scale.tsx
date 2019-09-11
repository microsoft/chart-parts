/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useContext, useEffect } from 'react'
import { SceneNodeBuilderContext } from '../Context'

export interface ScaleProps {
	name: string
	table: string
	create: (args: any) => any
}

export const Scale: React.FC<ScaleProps> = memo(({ create }) => {
	const api = useContext(SceneNodeBuilderContext)
	useEffect(() => {
		if (api) {
			api.scale(args => create(args))
		}
	}, [api, create])
	return null
})
