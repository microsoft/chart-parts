import {
	ViewSize,
	Scales,
	DataFrame,
	ChannelNames,
	SceneNode,
	CreateScaleArgs,
	ChannelHandler,
	Channels,
} from '@gog/mark-spec-interfaces'

/**
 * The scene frame is analagous to a stack-frame - it contains contextual
 * information for a section of a scene, including dimensions, scales, data, and event handlers
 */
export class SceneFrame {
	constructor(
		public node: SceneNode,
		public data: DataFrame,
		public view: ViewSize,
		public scales: Scales = {},
		public channels: ChannelNames = {},
	) {}

	/**
	 * Emits a new scene frame with the given node. Recomputes scales and registers handelrs.
	 */
	public pushNode(
		node: SceneNode,
		registerHandler: (handler: ChannelHandler) => string,
	) {
		const scales = this.getRecomputedScales(node, this.view)
		const channels = this.registerChannels(node.mark.channels, registerHandler)
		return new SceneFrame(node, this.data, this.view, scales, channels)
	}

	public pushData(data: DataFrame) {
		const dataFrame = { ...this.data, ...data }
		return new SceneFrame(
			this.node,
			dataFrame,
			this.view,
			this.scales,
			this.channels,
		)
	}

	/**
	 * Pushes a new sceneframe with an updated viewspace. Recomputes scales
	 * @param view The new view to push
	 */
	public pushView(view: ViewSize) {
		const scales = this.getRecomputedScales(this.node, view)
		return new SceneFrame(this.node, this.data, view, scales, this.channels)
	}

	private getRecomputedScales(node: SceneNode, view: ViewSize) {
		const scales = { ...this.scales }
		node.scales.forEach(({ name, table, creator }) => {
			const args: CreateScaleArgs = {
				view,
				data: this.data[table],
				scales,
			} as any
			const scale = creator(args)
			scales[name] = scale
		})
		return scales
	}

	private registerChannels(
		channels: Channels,
		registerHandler: (handler: ChannelHandler) => string,
	): ChannelNames {
		// For each channel the client specifies, encode the name-mapping in the Scenegraph and
		// map the handler function in our scene result
		return Object.entries(channels).reduce(
			(prev, [eventName, handler]) => {
				prev[eventName] = registerHandler(handler)
				return prev
			},
			({} as any) as ChannelNames,
		)
	}
}
