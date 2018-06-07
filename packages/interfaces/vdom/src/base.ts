import { Renderer } from '@gog/render-interfaces'

/**
 * Interface describing a Virtual Dom representation of a Node
 */
export interface VDomNode<Attrs, Style> {
	type: string
	attrs?: Attrs
	style?: { [key: string]: any }
	children?: Array<string | VDomNode<any, any>>
	channels: { [key: string]: string }
}

export interface VDomRenderer<TargetForm>
	extends Renderer<VDomNode<any, any>, TargetForm> {}
