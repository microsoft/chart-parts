import { SceneNodeBuilder } from './SceneNodeBuilder'
import { MarkType } from '@gog/mark-interfaces'

export class SceneBuilder extends SceneNodeBuilder {
	constructor() {
		super()
		this.setRole('frame')
			.setName('root')
			.setZIndex(0)
			.setType(MarkType.Group)
			.setSingleton(true)
	}
}
