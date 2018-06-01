import { SGNode, SGNodeType } from '@gog/mark-interfaces'
/**
 * A supertype for every node in the scene. Both marks and items extend this
 */
export abstract class SceneNode implements SGNode {
	public abstract readonly nodetype: SGNodeType

	/**
	 * The parent node of this scene node
	 */
	public parent?: SGNode

	/**
	 * The type of parent we have
	 */
	public parentType?: SGNodeType

	/**
	 * Metadata about this mark
	 */
	public metadata: { [key: string]: any } = {}
}
