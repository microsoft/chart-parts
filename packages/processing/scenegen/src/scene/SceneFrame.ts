import {
	ViewSize,
	Scales,
	DataFrame,
	ChannelNames,
	SceneNode,
	CreateScaleArgs,
} from '@gog/mark-spec-interfaces'

export class SceneFrame {
	constructor(
		public node: SceneNode,
		public data: DataFrame,
		public view: ViewSize,
		public scales: Scales = {},
		public channels: ChannelNames = {},
	) {}

	/**
	 * Emits a new scene frame with the given node.
	 *
	 * NOTE: This recomputes scales as well
	 *
	 * @param node The scene node to push
	 */
	public pushNode(node: SceneNode) {
		const scales = { ...this.scales }
		node.scales.forEach(({ name, table, creator }) => {
			const args: CreateScaleArgs = {
				view: this.view,
				data: this.data[table],
				scales,
			} as any
			const scale = creator(args)
			scales[name] = scale
		})
		return new SceneFrame(node, this.data, this.view, scales, this.channels)
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

	public pushView(view: ViewSize) {
		return new SceneFrame(
			this.node,
			this.data,
			view,
			this.scales,
			this.channels,
		)
	}

	public pushScales(scales: Scales) {
		const scaleFrame = { ...this.scales, ...scales }
		return new SceneFrame(
			this.node,
			this.data,
			this.view,
			scaleFrame,
			this.channels,
		)
	}

	public pushChannels(channels: ChannelNames) {
		return new SceneFrame(
			this.node,
			this.data,
			this.view,
			this.scales,
			channels,
		)
	}
}
