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
	 * Binds the domain of the scale to a field in the
	 * data
	 */
	bindDomain?: string

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
	protected api: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{(api: SceneNodeBuilder) => {
					this.api = api
					return null
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	public componentDidMount() {
		if (!this.api) {
			throw new Error('expected API to be present')
		}
		this.api.addScale(this.props.name, (args: CreateScaleArgs) =>
			this.createScale(args),
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
			const { bindDomain } = this.props
			if (!bindDomain) {
				throw new Error('Either bindDomain or domain must be set')
			}
			const { data } = args
			return this.processDomainValues(data.map(d => d[bindDomain]))
		}
	}
}
