// tslint:disable max-classes-per-file
import * as React from 'react'
import { CreateScaleArgs } from '@gog/mark-spec-interfaces'
import { SceneNodeBuilder } from '@gog/scenegen'
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
		this.api.addScale(
			this.props.name,
			this.props.table,
			(args: CreateScaleArgs) => this.createScale(args),
		)
	}

	protected abstract createScale(args: CreateScaleArgs): any

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: CreateScaleArgs): Domain {
		if (this.props.domain) {
			return this.props.domain(args)
		} else {
			const bindDomain = this.bindDomainArray
			const { data } = args
			const domainValues = data.flatMap(d => bindDomain.map(key => d[key]))
			const result = this.processDomainValues(domainValues)
			return result
		}
	}

	protected get bindDomainArray(): string[] {
		const { bindDomain } = this.props
		if (!bindDomain) {
			throw new Error('Either bindDomain or domain must be set')
		}
		return typeof bindDomain === 'string'
			? [bindDomain]
			: (bindDomain as string[])
	}
}
