import React from 'react'
import { ScaleCreatorArgs } from '@gog/mark-spec-interfaces'
import { ChartContextConsumer } from './ChartContext'
import { SceneBuilder } from '@gog/scenegen'
import { scaleBand, ScaleBand } from 'd3-scale'
import { Dimension } from './interfaces'

export interface BandScaleProps<DomainType, RangeType> {
	name: string

	widthName: string

	/**
	 * Bind to a field in the data
	 */
	bindTo?: string

	/**
	 * Aligns to a dimension
	 */
	alignTo?: Dimension

	/**
	 * The outer and inner padding value
	 */
	padding?: number

	/**
	 * Bin Alignment
	 */
	align?: number

	/**
	 * Domain Creator
	 */
	domain?: (args: ScaleCreatorArgs<any>) => DomainType[]

	/**
	 * Domain CReator
	 */
	range?: (args: ScaleCreatorArgs<any>) => [RangeType, RangeType]
}

export class BandScale extends React.PureComponent<
	BandScaleProps<any, number>
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
			const scale = scaleBand()
				.padding(this.getPadding())
				.align(this.getAlign())
				.domain(domain)
				.range(range)
			return scale
		}

		api.addScaleCreator(this.props.name, scaleCreator)
		api.addScaleCreator(this.props.widthName, ({ scales }) => () =>
			(scales[this.props.name] as ScaleBand<any>).bandwidth(),
		)
	}

	protected getPadding() {
		return this.props.padding || 0.01
	}

	protected getAlign() {
		return this.props.align || 0
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
			const domain = data.map(d => d[bindTo])
			return domain
		}
	}

	private getRange(args: ScaleCreatorArgs<any>): [number, number] {
		if (this.props.range) {
			return this.props.range(args)
		} else {
			const { alignTo } = this.props
			const { drawRect } = args
			if (!alignTo) {
				throw new Error('Either alignTo or range must be set')
			}

			const range: [number, number] =
				alignTo === Dimension.HEIGHT
					? [drawRect.bottom, drawRect.top]
					: [drawRect.left, drawRect.right]

			return range
		}
	}
}
