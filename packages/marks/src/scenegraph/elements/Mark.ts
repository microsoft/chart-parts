import { Item } from './Items/Item'
import { SceneNode } from './SceneNode'

export class Mark extends SceneNode {
	public readonly nodeType: string = 'mark'
	public marktype?: string
	public items: Item[] = []
	public clip?: boolean
	public interactive?: boolean
}
