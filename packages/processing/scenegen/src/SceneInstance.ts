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
interface DataFrame {
	[key: string]: any[]
}

interface ChannelNames {
	[key: string]: string
}

export class SceneInstance {
	private channelId: number = 0
	private channelHandlers: { [key: string]: (arg: any) => void } = {}
	private chartRect: ViewRect

	constructor(private scene: SceneNode, private options: ChartOptions) {
		this.chartRect = {
			left: 0,
			top: 0,
			right: options.width || 250,
			bottom: options.height || 250,
		}
	}

	public build(data: DataFrame) {
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

		const root = this.processNode(this.scene, {}, data, drawRect)
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
	 * @param parentScaleFrame The scales available for the given scene node
	 */
	private processNode(
		node: SceneNode,
		parentScaleFrame: Scales,
		parentDataFrame: DataFrame,
		drawRect: ViewRect,
	): SGMarkAny {
		const { mark } = node
		const channelNames = this.mapMarkChannels(mark.channels)
		const boundData = this.getBoundData(mark, parentDataFrame)
		const scaleFrame: Scales = this.getNextScaleFrame(
			parentScaleFrame,
			node.scales,
			drawRect,
			parentDataFrame,
		)

		const createBoundItem = (
			row: any,
			index: number,
			table: any[],
			dataFrame: DataFrame,
		) => {
			const item = this.createMarkItem(
				mark,
				row,
				index,
				table,
				channelNames,
				scaleFrame,
				dataFrame,
			)
			if (mark.type === MarkType.Group) {
				const groupItem = item as SGGroupItem
				const groupDrawRect = this.calculateInnerDrawRect(groupItem, drawRect)
				if (!groupItem.width) {
					;(groupItem as any).width = groupDrawRect.right - groupDrawRect.left
				}
				if (!groupItem.height) {
					;(groupItem as any).y2 = groupDrawRect.bottom - groupDrawRect.top
				}

				const itemScales: Scales = this.getNextScaleFrame(
					scaleFrame,
					node.scales,
					groupDrawRect,
					dataFrame,
				)
				groupItem.items = (node.children || []).map(c =>
					this.processNode(
						c,
						{ ...scaleFrame, ...itemScales },
						dataFrame,
						drawRect,
					),
				)
			}
			return item
		}

		/**
		 * If the data is a faceted group, then bind one group per facet.
		 * Otherwise bind one item per row.
		 */
		let items: any[] = []
		if (Array.isArray(boundData)) {
			items = boundData.map((d, index) =>
				createBoundItem(d, index, boundData, parentDataFrame),
			)
		} else {
			const { name, partitions } = boundData
			items = partitions.map((partition, index) => {
				const childDataFrame = { [name]: partition }
				const nextDataFrame = this.getNextDataFrame(
					parentDataFrame,
					childDataFrame,
				)
				return createBoundItem(partition, index, partitions, nextDataFrame)
			})
		}

		return SG.createMark(mark.type, items)
	}

	private getBoundData(
		mark: MarkSpec,
		dataFrame: DataFrame,
	): any[] | { name: string; partitions: any[][] } {
		const { table, singleton, facet } = mark
		if (!singleton && !table) {
			throw new Error('marks that are non-singletons must be data-bound')
		}

		if (singleton) {
			return [{}]
		}

		const sourceTable = dataFrame[table as string]
		if (!facet) {
			return sourceTable || []
		}

		const { name, partitionOn } = facet
		const partitionMap = new Map<string, any[]>()
		const partitions: any[][] = []

		sourceTable.forEach(row => {
			const key = partitionOn(row)
			if (!partitionMap.has(key)) {
				const newPartition: any[] = []
				partitions.push(newPartition)
				partitionMap.set(key, newPartition)
			}
			const partition = partitionMap.get(key) as any[]
			partition.push(row)
		})

		return { name, partitions }
	}

	private calculateInnerDrawRect(item: SGGroupItem, drawRect: ViewRect) {
		const left = drawRect.left + (item.x || 0)
		const top = drawRect.top + (item.y || 0)

		let width
		let height

		if (item.x2 !== undefined) {
			width = item.x2 - left
		} else if (item.width !== undefined) {
			width = item.width
		} else {
			width = drawRect.right - left
		}

		if (item.y2 !== undefined) {
			height = item.y2 - top
		} else if (item.height !== undefined) {
			height = item.height
		} else {
			height = drawRect.bottom - top
		}

		const right = left + width
		const bottom = top + height
		return {
			left,
			right,
			top,
			bottom,
		}
	}

	private getNextDataFrame(
		parentFrame: DataFrame,
		newFrame: DataFrame,
	): DataFrame {
		return { ...parentFrame, ...newFrame }
	}

	private getNextScaleFrame(
		parentFrame: Scales,
		scaleCreators: NamedScaleCreator[],
		drawRect: ViewRect,
		dataFrame: DataFrame,
	) {
		const result = { ...parentFrame }
		scaleCreators.forEach(({ name, table, creator }) => {
			const data = dataFrame[table]
			const args: CreateScaleArgs = {
				chartRect: this.chartRect,
				drawRect,
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
		channelNames: ChannelNames,
		scales: Scales,
		dataFrame: DataFrame,
	) {
		const { type, encodings, name, role } = mark
		return SG.createItem(type, {
			...this.transferEncodings(row, index, encodings, data, scales, dataFrame),
			name,
			role,
			metadata: { dataRowIndex: index },
			channels: channelNames,
		})
	}

	private mapMarkChannels(channels: Channels): ChannelNames {
		// A mapping of event-name to channel-id, which is used to populate the serializable scenegraph
		const channelNames: ChannelNames = {}

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
		dataFrame: DataFrame,
	) {
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
								tables: dataFrame,
						  })
						: encoding
				props[key] = encodingValue
			})
		return props
	}
}
