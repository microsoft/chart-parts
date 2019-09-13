/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useContext, useEffect } from 'react'
import { SceneBuilderContext } from '../Context'

export interface ScaleProps {
	name: string
	table: string
	create: (args: any) => any
}

export const Scale: React.FC<ScaleProps> = memo(({ create }) => {
	const api = useContext(SceneBuilderContext)
	useEffect(() => {
		if (api) {
			const newScale = (args: any) => create(args)
			api.scale(newScale)
			return () => {
				api.removeScale(newScale)
			}
		}
	}, [api, create])
	return null
})

Scale.displayName = 'Scale'
