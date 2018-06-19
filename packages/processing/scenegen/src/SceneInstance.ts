// tslint:disable no-this-assignment no-submodule-imports no-var-requires
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { MarkType } from '@gog/mark-interfaces'
import {
	Mark as MarkSpec,
	SceneNode,
	MarkEncodings,
	ViewRect,
	Channels,
	Scales,
	NamedScaleCreator,
	CreateScaleArgs,
} from '@gog/mark-spec-interfaces'
import * as SG from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

export class SceneInstance {
	private channelId: number = 0
	private channelHandlers: { [key: string]: (arg: any) => void } = {}
	private chartRect: ViewRect

	constructor(
		private scene: SceneNode,
		private options: ChartOptions,
		private tables: { [key: string]: any[] },
	) {
		this.chartRect = {
			left: 0,
			top: 0,
			right: options.width || 250,
			bottom: options.height || 250,
		}
	}

	public build() {
		const {
			chartRect: { top, left, bottom, right },
			channelHandlers,
		} = this
		const drawRect = {
			top: top + this.paddingTop,
			bottom: bottom - this.paddingBottom,
			left: left + this.paddingLeft,
			right: right - this.paddingRight,
		}

		const root = this.processNode(this.scene, {}, drawRect)
		return { root, channelHandlers }
	}

	private get paddingTop() {
		return this.getPadding('top')
	}

	private get paddingBottom() {
		return this.getPadding('bottom')
	}

	private get paddingLeft() {
		return this.getPadding('left')
	}

	private get paddingRight() {
		return this.getPadding('right')
	}

	private getPadding(name: string) {
		const paddingType = typeof this.options.padding
		if (paddingType === 'number') {
			return this.options.padding
		} else if (paddingType === 'object') {
			return (this.options.padding as any)[name] || 0
		}
		return 0
	}

	/**
	 * Processes a scene specification node into the SceneGraph model
	 * @param node The scene node to process
	 * @param scales The scales available for the given scene node
	 */
	private processNode(
		node: SceneNode,
		scales: Scales,
		drawRect: ViewRect,
	): SGMarkAny {
		const { chartRect } = this
		const { mark } = node
		const { type, table, channels, singleton } = mark
		if (!singleton && !table) {
			throw new Error('marks that are non-singletons must be data-bound')
		}
		const data: any[] = singleton ? [{}] : this.tables[table as string]
		const channelNames = this.mapMarkChannels(channels)

		const nodeScales: Scales = this.getNextScaleFrame(node.scales, scales, {
			drawRect,
			chartRect,
		})

		const items = (data || []).map((row, index) => {
			const item = this.createMarkItem(
				mark,
				row,
				index,
				data,
				channelNames,
				nodeScales,
			)
			if (type === MarkType.Group) {
				const groupItem = item as SGGroupItem
				// TODO: Regenerate draw rect
				const itemScales: Scales = this.getNextScaleFrame(
					node.scales,
					nodeScales,
					{
						drawRect,
						chartRect,
					},
				)
				groupItem.items = (node.children || []).map(c =>
					this.processNode(
						c,
						{ ...scales, ...nodeScales, ...itemScales },
						drawRect,
					),
				)
			}
			return item
		})

		return SG.createMark(type, items)
	}

	private getNextScaleFrame(
		creators: NamedScaleCreator[],
		parentFrame: Scales,
		partialArgs: Partial<CreateScaleArgs>,
	) {
		const result = { ...parentFrame }
		creators.forEach(({ name, table, creator }) => {
			const data = this.tables[table]
			const args: CreateScaleArgs = {
				...partialArgs,
				data,
				scales: result,
			} as any
			const scale = creator(args)
			result[name] = scale
		})
		return result
	}

	private createMarkItem(
		mark: MarkSpec,
		row: any,
		index: number,
		data: any[],
		channelNames: { [key: string]: string },
		scales: Scales,
	) {
		const { type, encodings, name, role } = mark
		return SG.createItem(type, {
			...this.transferEncodings(row, index, encodings, data, scales),
			name,
			role,
			metadata: { dataRowIndex: index },
			channels: channelNames,
		})
	}

	private mapMarkChannels(channels: Channels): { [key: string]: string } {
		// A mapping of event-name to channel-id, which is used to populate the serializable scenegraph
		const channelNames: { [key: string]: string } = {}

		// For each channel the client specifies, encode the name-mapping in the Scenegraph and
		// map the handler function in our scene result
		Object.keys(channels).forEach(eventName => {
			const handler = channels[eventName]
			const newChannelId = `evt${this.channelId++}`
			channelNames[eventName] = newChannelId

			// Use the client-specified event handler for the channel id
			this.channelHandlers[newChannelId] = handler
		})

		return channelNames
	}

	private transferEncodings(
		row: any,
		rowIndex: number,
		encodings: MarkEncodings,
		data: any[],
		scales: Scales,
	) {
		const tables = this.tables
		const props: { [key: string]: any } = {}
		Object.keys(encodings)
			.filter(t => t !== 'items')
			.forEach(key => {
				const encoding = encodings[key]
				const encodingValue =
					typeof encoding === 'function'
						? encoding({
								row,
								rowIndex,
								scales,
								data,
								tables,
						  })
						: encoding
				props[key] = encodingValue
			})
		return props
	}
}
