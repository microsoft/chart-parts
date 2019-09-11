/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { SceneNodeBuilder } from '@chart-parts/builder'
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { SceneNodeBuilderContext } from '../Context'

export interface ScaleProps {
	name: string
	table: string
	create: (args: any) => any
}

export class Scale extends React.PureComponent<ScaleProps> {
	protected apiInstance: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderContext.Consumer>
				{api => {
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
		this.api.scale((args: ScaleCreationContext) => this.props.create(args))
	}
}
