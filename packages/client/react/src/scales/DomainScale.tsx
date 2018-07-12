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
	table?: string

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
	domain?: string | ((args: CreateScaleArgs) => Domain) | Domain
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
