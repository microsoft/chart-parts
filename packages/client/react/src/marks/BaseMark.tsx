import * as React from 'react'
import { ChartContextConsumer } from '../ChartContext'
import { MarkType } from '@gog/mark-interfaces'
import { SceneBuilder } from '@gog/scenegen'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export abstract class BaseMark<
	T extends CommonMarkProps
> extends React.PureComponent<T> {
	protected abstract markType: MarkType

	private api: SceneBuilder | undefined

	public componentDidMount() {
		if (!this.api) {
			throw new Error('expected API to be present')
		}
		const channels: { [key: string]: (arg: any) => void } = {}
		const eventHandlers: { [key: string]: (arg: any) => void } = this.props
			.eventHandlers as any
		if (eventHandlers) {
			Object.entries(eventHandlers).forEach(
				([eventName, handler]) => (channels[eventName] = handler),
			)
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
