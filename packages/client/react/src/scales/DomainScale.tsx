// tslint:disable max-classes-per-file
import * as React from 'react'
import { CreateScaleArgs } from '@gog/interfaces'
import { SceneNodeBuilder } from '@gog/builder'
import { SceneNodeBuilderConsumer } from '../Context'

export interface DomainScaleProps<Domain> {
	/**
	 * The name of the scale
	 */
	name: string

	/**
	 * The data set to bind to
	 */
	table: string

	/**
	 * Binds the domain of the scale to a field in the
	 * data
	 */
	bindDomain?: string | string[]

	/**
	 * Manually create the domain based on a scale-creation
	 * context
	 */
	domain?: (args: CreateScaleArgs) => Domain
}

export abstract class DomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
> extends React.PureComponent<Props> {
	protected apiInstance: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{(api: SceneNodeBuilder) => {
					this.apiInstance = api
					this.addScale()
					return null
				}}
			</SceneNodeBuilderConsumer>
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
