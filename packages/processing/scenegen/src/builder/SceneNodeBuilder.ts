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
	public scale(
		...creators: Array<ScaleCreator | { build: () => ScaleCreator }>
	): SceneNodeBuilder {
		creators.forEach(c =>
			this.scales.push(
				typeof (c as any).build === 'function' ? (c as any).build() : c,
			),
		)
		return this
	}

	public mark(builder: MarkBuilder): SceneNodeBuilder {
		this.markBuilder = builder
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public push(callback: (b: SceneNodeBuilder) => void): SceneNodeBuilder {
		const newNode = new SceneNodeBuilder()
		this.children.push(newNode)
		callback(newNode)
		return this
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
