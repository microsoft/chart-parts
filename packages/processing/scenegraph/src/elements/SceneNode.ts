/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGNode, SGNodeType, Metadata } from '@chart-parts/interfaces'
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
	public metadata: Metadata = {} as any
}
