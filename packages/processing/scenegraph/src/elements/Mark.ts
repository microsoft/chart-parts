import { SGMark, SGNodeType } from '@gog/scenegraph-interfaces'
import { Item } from './items/Item'
import { SceneNode } from './SceneNode'

export class Mark<T extends Item> extends SceneNode implements SGMark<T> {
	public readonly nodetype: SGNodeType = SGNodeType.Mark
	public marktype?: string
	public items: T[] = []
	public clip?: boolean
	public interactive?: boolean
	public role?: string
	public name?: string
	public zIndex?: number
}
