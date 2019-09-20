/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useContext, useEffect, useMemo } from 'react'
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { SceneBuilderContext } from '../Context'

/**
 * Props for a scale with a domain
 * @category Scale
 */
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

/**
 * Creates a new DomainScale
 * @ignore
 * @param displayName The name of the scale
 * @param createScale The scale creation function
 * @param propsToCheck Props to check for scale recreation
 */
export function createDomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
>(
	displayName: string,
	createScale: (props: Props) => any,
	propsToCheck: string[] = [],
): React.FC<Props> {
	const result: React.FC<Props> = memo(props => {
		const api = useContext(SceneBuilderContext)
		const scale = useMemo(() => api && createScale(props as Props), [
			api,
			createScale,
			...propsToCheck.map(p => (props as any)[p]),
		])
		useEffect(() => {
			if (api && scale) {
				api.scale(scale)
				return () => {
					api.removeScale(scale)
				}
			}
		}, [api, scale])
		return null
	})
	result.displayName = displayName
	return result
}
