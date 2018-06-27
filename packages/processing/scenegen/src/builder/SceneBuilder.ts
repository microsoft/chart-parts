import { SceneNodeBuilder } from './SceneNodeBuilder'
import { MarkType } from '@gog/mark-interfaces'
import { MarkBuilder } from './MarkBuilder'

export class SceneBuilder extends SceneNodeBuilder {
	constructor() {
		super()
		this.mark(
			new MarkBuilder()
				.role('frame')
				.name('root')
				.zIndex(0)
				.type(MarkType.Group)
				.singleton(true),
		)
	}
}
