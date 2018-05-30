/**
 * Interface describing a Virtual Dom representation of a Node
 */
export interface VirtualDomNode {
	type: string
	attrs?: { [key: string]: string | number }
	style?: { [key: string]: string | number }
	children?: VirtualDomNode[]
}

/**
 * Basic interface for a rendering implementation
 */
export interface Renderer<SourceForm, TargetForm> {
	render(input: SourceForm): TargetForm
}

export interface VDomRenderer<TargetForm> {
	render(input: VirtualDomNode): TargetForm
}
