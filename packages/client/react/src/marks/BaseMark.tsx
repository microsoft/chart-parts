import * as React from 'react'
import { SceneNodeBuilderConsumer, SceneNodeBuilderProvider } from '../Context'
import { MarkType } from '@gog/mark-interfaces'
import { SceneNodeBuilder, mark } from '@gog/scenegen'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'
import { MarkEncodings, MarkEncoding } from '@gog/mark-spec-interfaces'

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

	protected addMark() {
		return this.api.push().mark(this.createMark())
	}

	protected createMark() {
		return mark(this.markType)
			.channels(this.channels)
			.encodings(this.encodings)
			.table(this.props.table)
			.name(this.props.name)
			.role(this.props.role)
			.singleton(this.props.singleton)
	}

	protected abstract encodeCustomProperties(): any
}
