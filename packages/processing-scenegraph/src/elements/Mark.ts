/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SceneNode } from './SceneNode'
import { Item } from './items/Item'
import { SGMark, SGNodeType, MarkType } from '@chart-parts/interfaces'

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
