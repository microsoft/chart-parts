import React from 'react'
import { ChartContextConsumer } from './ChartContext'
import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { SceneBuilder } from '@gog/scenegen'

export interface RectProps {
	/**
	 * TODO: either capture all events or use a map
	 */
	onMouseEnter?: (arg: any) => void
	onMouseLeave?: (arg: any) => void
	x?: MarkEncoding
	y?: MarkEncoding
	y2?: MarkEncoding
	width?: MarkEncoding
	fill?: MarkEncoding
	height?: MarkEncoding
}

export class Rect extends React.PureComponent<RectProps> {
	private api: SceneBuilder

	public componentDidMount() {
		const channels: { [key: string]: (arg: any) => void } = {}
		if (this.props.onMouseEnter) {
			channels.mouseEnter = this.props.onMouseEnter
		}
		if (this.props.onMouseLeave) {
			channels.mouseLeave = this.props.onMouseLeave
		}

		this.api.addMark({
			type: MarkType.Rect,
			channels,
			encodings: {
				x: this.props.x,
				y: this.props.y,
				y2: this.props.y2,
				height: this.props.height,
				width: this.props.width,
				fill: this.props.fill,
			},
		})
	}
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
}
