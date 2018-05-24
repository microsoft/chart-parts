/**
 * A supertype for every node in the scene. Both marks and items extend this
 */
export abstract class SceneNode {
	public abstract readonly nodeType: string

	/**
	 * The parent node of this scene node
	 */
	public parent?: SceneNode

	/**
	 * The type of parent we have
	 */
	public parentType?: 'mark' | 'group'

	/**
	 * Metadata about this mark
	 */
	public metadata: { [key: string]: any } = {}
}
