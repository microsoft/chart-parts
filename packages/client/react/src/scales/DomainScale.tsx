/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useContext, useEffect, useMemo } from 'react'
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { SceneNodeBuilderContext } from '../Context'

export interface DomainScaleProps<Domain> {
	/**
	 * The name of the scale
	 */
	name: string

	/**
	 * Sets the domain.
	 *
	 * If a string is used, it is used as the name of the
	 * field to bind to in the data
	 *
	 * If a function is provided, it should construct the domain from the arguments providiedi.
	 *
	 * If an array is provided, it is treated as the explicit domain
	 */
	domain?: string | ((args: ScaleCreationContext) => Domain) | Domain
}

export function createDomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
>(displayName: string, createScale: (props: Props) => any): React.FC<Props> {
	const result = memo(props => {
		const api = useContext(SceneNodeBuilderContext)
		const scale = useMemo(() => api && createScale(props as Props), [api])
		useEffect(() => {
			if (api && scale) {
				api.scale(scale)
			}
		}, [api, scale])
		return null
	})
	result.displayName = displayName
	return result
}
