// tslint:disable no-this-assignment
import { SceneNode, ScaleCreator } from '@gog/mark-spec-interfaces'
import { MarkBuilder } from './MarkBuilder'
import { MarkType } from '@gog/mark-interfaces'

export class SceneNodeBuilder {
	private markBuilder: MarkBuilder | undefined

	/**
	 * The scales defined for children of this node
	 */
	private scales: ScaleCreator[] = []

	/**
	 * The child scene
	 */
	private children: SceneNodeBuilder[] = []

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param table The name of the bound datatable to use
	 * @param creator The scale-creator
	 */
	public scale(creator: ScaleCreator | { build: () => ScaleCreator }) {
		this.scales.push(
			typeof (creator as any).build === 'function'
				? (creator as any).build()
				: creator,
		)
		return this
	}

	public mark(builder: MarkBuilder) {
		this.markBuilder = builder
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public push() {
		const newNode = new SceneNodeBuilder()
		this.children.push(newNode)
		return newNode
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		const { scales, markBuilder, children: builderChildren } = this
		if (!markBuilder) {
			throw new Error('scene node has no mark set')
		}
		const mark = markBuilder.build()
		const children = builderChildren.map(c => c.build())
		if (children.length > 0 && mark.type !== MarkType.Group) {
			throw new Error('only group marks may have children')
		}
		return { mark, scales, children }
	}
}
