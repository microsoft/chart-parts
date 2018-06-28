import {
	ViewSize,
	Scales,
	DataFrame,
	ChannelNames,
	SceneNode,
	CreateScaleArgs,
	ChannelHandler,
	Channels,
	MarkSpec,
} from '@gog/interfaces'

/**
 * The scene frame is analagous to a stack-frame - it contains contextual
 * information for a section of a scene, including dimensions, scales, data, and event handlers
 */
export class SceneFrame {
	constructor(
		public node: SceneNode,
		public mark: MarkSpec | undefined,
		public data: DataFrame,
		public view: ViewSize,
		public scales: Scales = {},
		public channels: ChannelNames = {},
		public channelId: number = 0,
		public channelHandlers: { [key: string]: ChannelHandler } = {},
	) {}

	/**
	 * Emits a new scene frame with the given node. Recomputes scales and registers handelrs.
	 */
	public pushNode(node: SceneNode) {
		const scales = this.getRecomputedScales(node, this.view)
		return new SceneFrame(
			node,
			undefined,
			this.data,
			this.view,
			scales,
			{},
			this.channelId,
			this.channelHandlers,
		)
	}

	public pushMark(mark: MarkSpec) {
		const channels = this.registerChannels(mark.channels)
		return new SceneFrame(
			this.node,
			mark,
			this.data,
			this.view,
			this.scales,
			channels,
			this.channelId,
			this.channelHandlers,
		)
	}

	public pushData(data: DataFrame) {
		const dataFrame = { ...this.data, ...data }
		return new SceneFrame(
			this.node,
			this.mark,
			dataFrame,
			this.view,
			this.scales,
			this.channels,
			this.channelId,
			this.channelHandlers,
		)
	}

	/**
	 * Pushes a new sceneframe with an updated viewspace. Recomputes scales
	 * @param view The new view to push
	 */
	public pushView(view: ViewSize) {
		const scales = this.getRecomputedScales(this.node, view)
		return new SceneFrame(
			this.node,
			this.mark,
			this.data,
			view,
			scales,
			this.channels,
			this.channelId,
			this.channelHandlers,
		)
	}

	private getRecomputedScales(node: SceneNode, view: ViewSize) {
		const data = this.data

		let scales = { ...this.scales }
		node.scales.forEach(creator => {
			const args: CreateScaleArgs = { view, data, scales }
			const newScales = creator(args)
			scales = { ...scales, ...newScales }
		})
		return scales
	}

	private registerChannels(channels: Channels): ChannelNames {
		// For each channel the client specifies, encode the name-mapping in the Scenegraph and
		// map the handler function in our scene result
		return Object.entries(channels).reduce(
			(prev, [eventName, handler]) => {
				prev[eventName] = this.registerHandler(handler)
				return prev
			},
			({} as any) as ChannelNames,
		)
	}

	private registerHandler(handler: ChannelHandler) {
		const id = `evt${this.channelId++}`
		this.channelHandlers[id] = handler
		return id
	}
}
