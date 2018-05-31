import { Renderer } from '@gog/render-interfaces'
/**
 * Interface describing a Virtual Dom representation of a Node
 */
export interface VirtualDomNode {
	type: string
	attrs?: { [key: string]: any }
	style?: { [key: string]: any }
	children?: VirtualDomNode[]
}

export interface VDomRenderer<TargetForm>
	extends Renderer<VirtualDomNode, TargetForm> {}
