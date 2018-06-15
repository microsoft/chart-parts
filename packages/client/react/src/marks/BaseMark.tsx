import * as React from 'react'
import { SceneNodeBuilderConsumer } from '../Context'
import { MarkType } from '@gog/mark-interfaces'
import { SceneNodeBuilder } from '@gog/scenegen'
import { Mark } from '@gog/mark-spec-interfaces'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export abstract class BaseMark<
	T extends CommonMarkProps
> extends React.PureComponent<T> {
	protected abstract markType: MarkType

	private api: SceneNodeBuilder | undefined

	public componentDidMount() {
		console.log('Mounting Mark', this)
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

		this.addMark({
			type: this.markType,
			bindTo: this.props.table,
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
					return this.renderInner()
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected addMark(mark: Mark) {
		if (!this.api) {
			throw new Error('api must be defined')
		}
		this.api.addMark(mark)
	}

	protected renderInner(): React.ReactNode {
		return null
	}

	protected abstract encodeCustomProperties(): any
}
