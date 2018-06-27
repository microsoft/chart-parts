import { SceneBuilder } from './SceneBuilder'
import { MarkBuilder } from './MarkBuilder'
import { MarkType } from '@gog/mark-interfaces'

export * from './MarkBuilder'
export * from './SceneBuilder'
export * from './SceneNodeBuilder'

export function scene() {
	return new SceneBuilder()
}

export function mark(type: MarkType) {
	return new MarkBuilder().type(type)
}
