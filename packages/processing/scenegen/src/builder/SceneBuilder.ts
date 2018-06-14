import { Scene } from '@gog/mark-spec-interfaces'
import { SceneNodeBuilder } from './SceneNodeBuilder'

export class SceneBuilder {
	private nodes: SceneNodeBuilder[] = []

	public addNode(node: SceneNodeBuilder) {
		this.nodes.push(node)
	}

	/**
	 * Builds the scene object
	 */
	public build(): Scene {
		return {
			nodes: this.nodes.map(n => n.build()),
		}
	}
}
