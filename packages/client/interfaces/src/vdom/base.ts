import { Renderer } from '../render'

/**
 * Interface describing a Virtual Dom representation of a Node
 */
export interface VDomNode<Attrs, Style> {
	type: string
	attrs?: Attrs
	style?: Style & { [key: string]: any }
	children?: Array<string | VDomNode<any, any>>
	channels?: { [key: string]: string }
	metadata?: { [key: string]: any }
}

export interface VDomRenderer<TargetForm>
	extends Renderer<VDomNode<any, any>, TargetForm> {}
