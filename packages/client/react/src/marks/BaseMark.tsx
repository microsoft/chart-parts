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
		this.addMark()
	}

	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{api => {
					this.api = api
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

	protected addMark() {
		if (!this.api) {
			throw new Error('api must be defined')
		}

		const { channels, encodings, markType } = this
		const { table, name, role, singleton } = this.props
		this.api
			.setType(markType)
			.setTable(table)
			.addChannels(channels)
			.addEncodings(encodings)
			.setName(name)
			.setRole(role)
			.setSingleton(singleton)
	}

	protected renderInner(): React.ReactNode {
		return null
	}

	protected abstract encodeCustomProperties(): any
}
