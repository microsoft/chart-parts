/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark, SGNodeType, MarkType } from '@chart-parts/interfaces'
import { Item } from './items/Item'
import { SceneNode } from './SceneNode'

export class Mark<T extends Item> extends SceneNode implements SGMark<T> {
	public readonly nodetype: SGNodeType = SGNodeType.Mark
	public marktype?: MarkType
	public items: T[] = []
	public clip?: boolean
	public interactive?: boolean
	public role?: string
	public name?: string
	public zIndex?: number
}
