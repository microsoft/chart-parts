import React from 'react'
import { ChartContextConsumer } from '../ChartContext'
import { MarkType } from '@gog/mark-interfaces'
import { SceneBuilder } from '@gog/scenegen'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export abstract class BaseMark<
	T extends CommonMarkProps
> extends React.PureComponent<T> {
	protected abstract markType: MarkType

	private api: SceneBuilder

	public componentDidMount() {
		const channels: { [key: string]: (arg: any) => void } = {}
		if (this.props.eventHandlers) {
			Object.keys(this.props.eventHandlers).forEach(eventName => {
				channels[eventName] = this.props.eventHandlers[eventName]
			})
		}

		this.api.addMark({
			type: this.markType,
			channels,
			encodings: {
				...captureCommonEncodings(this.props),
				...this.encodeCustomProperties(),
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

	protected abstract encodeCustomProperties(): any
}
