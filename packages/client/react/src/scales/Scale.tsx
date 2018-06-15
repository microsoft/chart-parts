import * as React from 'react'
import { SceneNodeBuilderConsumer } from '../Context'
import { SceneNodeBuilder } from '@gog/scenegen'

export interface ScaleProps {
	name: string
	table: string
	create: (args: any) => any
}

export class Scale extends React.PureComponent<ScaleProps> {
	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{api => {
					this.receiveApi(api)
					return null
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected receiveApi(api: SceneNodeBuilder) {
		api.addScale(this.props.name, this.props.table, this.props.create)
	}
}
