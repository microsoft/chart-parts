/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { SceneNodeBuilder } from '@chart-parts/builder'
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

export abstract class DomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
> extends React.PureComponent<Props> {
	protected apiInstance: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderContext.Consumer>
				{(api: SceneNodeBuilder) => {
					this.apiInstance = api
					this.addScale()
					return null
				}}
			</SceneNodeBuilderContext.Consumer>
		)
	}

	protected get api(): SceneNodeBuilder {
		if (!this.apiInstance) {
			throw new Error('api must be defined')
		}
		return this.apiInstance as SceneNodeBuilder
	}

	protected addScale() {
		this.api.scale(this.createScale())
	}

	protected abstract createScale(): any
}
