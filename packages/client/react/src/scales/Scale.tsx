import React from 'react'
import { ChartContextConsumer } from '../ChartContext'
import { SceneBuilder } from '@gog/scenegen'

export interface ScaleProps {
	name: string
	create: (args: any) => any
}

export class Scale extends React.PureComponent<ScaleProps> {
	public render() {
		return (
			<ChartContextConsumer>
				{api => {
					this.receiveApi(api)
					return null
				}}
			</ChartContextConsumer>
		)
	}

	protected receiveApi(api: SceneBuilder) {
		api.addScaleCreator(this.props.name, this.props.create)
	}
}
