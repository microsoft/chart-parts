import { ChannelHandler } from './specification'

/**
 * Basic interface for a rendering implementation
 */
export interface Renderer<SourceForm, TargetForm> {
	render(
		input: SourceForm,
		handlers: { [channelName: string]: ChannelHandler },
	): TargetForm
}
