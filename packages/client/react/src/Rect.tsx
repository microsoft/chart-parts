import React from 'react'
import { ChartContextConsumer } from './ChartContext'
import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'

export interface RectProps {
	/**
	 * TODO: either capture all events or use a map
	 */
	onMouseOver?: (element: any, row: any) => void
	onMouseOut?: (element: any, row: any) => void

	x?: MarkEncoding
	y?: MarkEncoding
	y2?: MarkEncoding
	width?: MarkEncoding
	fill?: MarkEncoding
	height?: MarkEncoding
}

export class Rect extends React.PureComponent<RectProps> {
	public render() {
		return (
			<ChartContextConsumer>
				{api => {
					api.addMark({
						type: MarkType.Rect,
						encodings: {
							x: this.props.x,
							y: this.props.y,
							y2: this.props.y2,
							height: this.props.height,
							width: this.props.width,
							fill: this.props.fill,
						},
					})
					return null
				}}
			</ChartContextConsumer>
		)
	}
}
