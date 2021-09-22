/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { FC, memo, useContext, useEffect } from 'react'
import { SceneBuilderContext } from '../Context'

/**
 * Generic scale props
 * @category Scale
 */
export interface ScaleProps {
	/**
	 * The name of the scale
	 */
	name: string

	/**
	 * The table the scale is applied to
	 */
	table: string

	/**
	 * A factory function for creating the scale
	 */
	create: (args: any) => any
}

/**
 * Generic scale component
 * @category Scale
 */
export const Scale: FC<ScaleProps> = memo(function Scale({ create }) {
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
