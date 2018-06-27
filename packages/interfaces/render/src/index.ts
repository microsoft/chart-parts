import { ChannelHandler } from '@gog/mark-spec-interfaces'

/**
 * Basic interface for a rendering implementation
 */
export interface Renderer<SourceForm, TargetForm> {
	render(
		input: SourceForm,
		handlers: { [channelName: string]: ChannelHandler },
	): TargetForm
}
