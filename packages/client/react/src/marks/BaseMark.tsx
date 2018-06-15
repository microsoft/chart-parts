import * as React from 'react'
import { SceneNodeBuilderConsumer } from '../Context'
import { MarkType } from '@gog/mark-interfaces'
import { SceneNodeBuilder } from '@gog/scenegen'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export abstract class BaseMark<
	T extends CommonMarkProps
> extends React.PureComponent<T> {
	protected abstract markType: MarkType

	private apiInstance: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{api => {
					this.apiInstance = api
					this.addMark()
					return this.renderInner()
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected get channels() {
		const channels: { [key: string]: (arg: any) => void } = {}
		const eventHandlers: { [key: string]: (arg: any) => void } = this.props
			.eventHandlers as any
		if (eventHandlers) {
			Object.entries(eventHandlers).forEach(
				([eventName, handler]) => (channels[eventName] = handler),
			)
		}
		return channels
	}

	protected get encodings() {
		return {
			...captureCommonEncodings(this.props),
			...this.encodeCustomProperties(),
		}
	}

	protected get api() {
		if (!this.apiInstance) {
			throw new Error('api must be defined')
		}

		return this.apiInstance
	}

	protected addMark() {
		this.api
			.setType(this.markType)
			.addChannels(this.channels)
			.addEncodings(this.encodings)
			.setTable(this.props.table)
			.setName(this.props.name)
			.setRole(this.props.role)
			.setSingleton(this.props.singleton)
	}

	protected renderInner(): React.ReactNode {
		return null
	}

	protected abstract encodeCustomProperties(): any
}
