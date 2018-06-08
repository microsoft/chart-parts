import React from 'react'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { ChartContextConsumer } from '../ChartContext'
import { SceneBuilder } from '@gog/scenegen'
import { Dimension } from '../interfaces'

export interface BaseScaleProps<DomainType, RangeType> {
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
	 * Binds the range of the scale to a chart dimension
	 * in the mark's draw-rect
	 */
	bindRange?: Dimension

	/**
	 * Manually create the domain based on a scale-creation
	 * context
	 */
	domain?: (args: ScaleCreatorArgs<any>) => DomainType[]

	/**
	 * Manually create the rangse based on a scale-creation
	 * context
	 */
	range?: (args: ScaleCreatorArgs<any>) => [RangeType, RangeType]
}

export abstract class BaseScale<
	DomainType,
	RangeType,
	Props extends BaseScaleProps<DomainType, RangeType>
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
		const scaleCreator = args => {
			const domain = this.getDomain(args)
			const range = this.getRange(args)
			return this.createScale(domain, range)
		}

		this.api.addScaleCreator(this.props.name, scaleCreator)
	}

	protected abstract createScale(domain: DomainType[], range: RangeType[])

	protected processDomainValues(values: DomainType[]): DomainType[] {
		return values
	}

	private getDomain(args: ScaleCreatorArgs<any>) {
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

	private getRange(args: ScaleCreatorArgs<any>): [RangeType, RangeType] {
		if (this.props.range) {
			return (this.props.range(args) as any) as [RangeType, RangeType]
		} else {
			const { bindRange } = this.props
			const { drawRect } = args
			if (!bindRange) {
				throw new Error('Either bindRange or range must be set')
			}

			const range: [number, number] =
				bindRange === Dimension.HEIGHT
					? [drawRect.bottom, drawRect.top]
					: [drawRect.left, drawRect.right]

			return (range as any) as [RangeType, RangeType]
		}
	}
}
