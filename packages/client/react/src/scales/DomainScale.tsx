// tslint:disable max-classes-per-file
import * as React from 'react'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { SceneBuilder } from '@gog/scenegen'
import { ChartContextConsumer } from '../ChartContext'

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
	domain?: (args: ScaleCreatorArgs<any>) => Domain
}

export abstract class DomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
> extends React.PureComponent<Props> {
	protected api: SceneBuilder | undefined

	public render() {
		return (
			<ChartContextConsumer>
				{api => {
					this.api = api
					return null
				}}
			</ChartContextConsumer>
		)
	}

	public componentDidMount() {
		if (!this.api) {
			throw new Error('expected API to be present')
		}
		this.api.addScaleCreator(this.props.name, args => this.createScale(args))
	}

	protected abstract createScale(args: ScaleCreatorArgs<any>): any

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: ScaleCreatorArgs<any>): Domain {
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
