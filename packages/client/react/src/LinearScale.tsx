import React from 'react'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { ChartContextConsumer } from './ChartContext'
import { SceneBuilder } from '@gog/scenegen'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { Dimension } from './interfaces'

export interface LinearScaleProps<DomainType, RangeType> {
	name: string

	/**
	 * Bind to a field in the data
	 */
	bindTo?: string

	alignTo?: Dimension

	/**
	 * Domain Creator
	 */
	domain?: (args: ScaleCreatorArgs<any>) => [DomainType, DomainType]

	/**
	 * Domain CReator
	 */
	range?: (args: ScaleCreatorArgs<any>) => [RangeType, RangeType]
}

export class LinearScale extends React.PureComponent<
	LinearScaleProps<any, any>
> {
	public render() {
		return (
			<ChartContextConsumer>
				{api => {
					this.receiveApi(api)
					return null
				}}
			</ChartContextConsumer>
		)
	}

	protected receiveApi(api: SceneBuilder) {
		const scaleCreator = args => {
			const domain = this.getDomain(args)
			const range = this.getRange(args)
			const scale = scaleLinear()
				.domain(domain)
				.range(range)
			return scale
		}

		api.addScaleCreator(this.props.name, scaleCreator)
	}

	private getDomain(args: ScaleCreatorArgs<any>) {
		if (this.props.domain) {
			return this.props.domain(args)
		} else {
			const { bindTo } = this.props
			if (!bindTo) {
				throw new Error('Either bindTo or domain must be set')
			}
			const { data } = args
			const domain = extent(data.map(d => d[bindTo]))
			return domain
		}
	}

	private getRange(args: ScaleCreatorArgs<any>) {
		if (this.props.range) {
			return this.props.range(args)
		} else {
			const { alignTo } = this.props
			const { drawRect } = args
			if (!alignTo) {
				throw new Error('Either alignTo or range must be set')
			}

			const range =
				alignTo === Dimension.HEIGHT
					? [drawRect.bottom, drawRect.top]
					: [drawRect.left, drawRect.right]

			return range
		}
	}
}
