import * as React from 'react'
import { SceneNodeBuilderConsumer, SceneNodeBuilderProvider } from '../Context'
import {
	MarkType,
	MarkEncodings,
	MarkEncoding,
	ChannelHandler,
} from '@gog/interfaces'
import { SceneNodeBuilder, mark } from '@gog/builder'
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
					const node = this.addMark()
					return (
						<SceneNodeBuilderProvider value={node}>
							{this.props.children}
						</SceneNodeBuilderProvider>
					)
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected get channels() {
		const eventHandlers =
			(this.props.eventHandlers as { [key: string]: ChannelHandler }) || {}
		const channels: { [key: string]: ChannelHandler } = {
			...eventHandlers,
		}
		Object.keys(this.props).forEach(propKey => {
			if (propKey.startsWith('on')) {
				channels[propKey] = ((this.props as any)[
					propKey
				] as any) as ChannelHandler
			}
		})
		return channels
	}

	protected get encodings(): MarkEncodings {
		const encodingProps = {
			...captureCommonEncodings(this.props),
			...this.encodeCustomProperties(),
		}
		return Object.entries(encodingProps).reduce(
			(prev, [name, propValue]) => {
				prev[name] = (typeof propValue === 'function'
					? propValue
					: ((() => propValue) as any)) as MarkEncoding
				return prev
			},
			({} as any) as MarkEncodings,
		)
	}

	protected get api() {
		if (!this.apiInstance) {
			throw new Error('api must be defined')
		}
		return this.apiInstance
	}

	protected addMark(): SceneNodeBuilder {
		return this.api.mark(this.createMark())
	}

	protected createMark() {
		return mark(this.markType)
			.handle(this.channels)
			.encode(this.encodings)
			.table(this.props.table)
			.name(this.props.name)
			.role(this.props.role)
			.singleton(this.props.singleton)
	}

	protected abstract encodeCustomProperties(): any
}
