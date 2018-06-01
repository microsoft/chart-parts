import { Item } from './Items/Item'
import { SceneNode } from './SceneNode'

export class Mark<T extends Item> extends SceneNode {
	public readonly nodeType: string = 'mark'
	public marktype?: string
	public items: T[] = []
	public clip?: boolean
	public interactive?: boolean
}
