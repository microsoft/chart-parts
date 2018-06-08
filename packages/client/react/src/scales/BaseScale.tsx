// tslint:disable max-classes-per-file
import React from 'react'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { ChartContextConsumer } from '../ChartContext'
import { SceneBuilder } from '@gog/scenegen'

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

export interface DomainRangeScaleProps<Domain, Range, RangeBind>
	extends DomainScaleProps<Domain> {
	/**
	 * Binds the range of the scale to a chart dimension
	 * in the mark's draw-rect
	 */
	bindRange?: RangeBind

	/**
	 * Manually create the rangse based on a scale-creation
	 * context
	 */
	range?: (args: ScaleCreatorArgs<any>) => Range
}

export abstract class DomainScale<
	Props extends DomainScaleProps<Domain>,
	Domain
> extends React.PureComponent<Props> {
	protected api: SceneBuilder

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
		this.api.addScaleCreator(this.props.name, args => this.createScale(args))
	}

	protected abstract createScale(args: ScaleCreatorArgs<any>)

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: ScaleCreatorArgs<any>) {
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

export abstract class DomainRangeScale<
	Props extends DomainRangeScaleProps<Domain, Range, RangeBind>,
	Domain,
	Range,
	RangeBind
> extends DomainScale<Props, Domain> {
	protected abstract handleRangeBind(
		args: ScaleCreatorArgs<any>,
		bind: RangeBind,
	)

	protected getRange(args: ScaleCreatorArgs<any>): Range {
		if (this.props.range) {
			return this.props.range(args)
		} else {
			const { bindRange } = this.props
			if (!bindRange) {
				throw new Error('Either bindRange or range must be set')
			}
			return this.handleRangeBind(args, bindRange)
		}
	}
}
