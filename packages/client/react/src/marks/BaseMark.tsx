import * as React from 'react'
import { SceneNodeBuilderConsumer, SceneNodeBuilderProvider } from '../Context'
import {
	MarkType,
	MarkEncodings,
	MarkEncoding,
	ChannelHandler,
} from '@markable/interfaces'
import { SceneNodeBuilder, mark, MarkBuilder } from '@markable/builder'
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
					: ((() => propValue) as any)) as MarkEncoding<any>
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

	protected createMark(): MarkBuilder {
		const { table, name, role } = this.props
		let result = mark(this.markType)
			.handle(this.channels)
			.encode(this.encodings)

		if (table) {
			result = result.table(table as string)
		}

		const singleton = this.props.singleton
		if (singleton) {
			result = result.singleton(singleton as boolean)
		}

		if (name) {
			result = result.name(name as string)
		}

		if (role) {
			result = result.role(role as string)
		}

		return result
	}

	protected abstract encodeCustomProperties(): any
}
