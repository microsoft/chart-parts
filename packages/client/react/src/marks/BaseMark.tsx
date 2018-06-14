import * as React from 'react'
import { SceneNodeBuilderConsumer } from '../Context'
import { MarkType } from '@gog/mark-interfaces'
import { SceneNodeBuilder } from '@gog/scenegen'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export abstract class BaseMark<
	T extends CommonMarkProps
> extends React.PureComponent<T> {
	protected abstract markType: MarkType

	private api: SceneNodeBuilder | undefined

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
			<SceneNodeBuilderConsumer>
				{api => {
					this.api = api
					return null
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected abstract encodeCustomProperties(): any
}
