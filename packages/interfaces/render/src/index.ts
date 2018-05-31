/**
 * Basic interface for a rendering implementation
 */
export interface Renderer<SourceForm, TargetForm> {
	render(input: SourceForm): TargetForm
}
