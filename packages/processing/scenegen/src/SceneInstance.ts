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
	 * @param scales The scales available for the given scene node
	 */
	private processNode(
		node: SceneNode,
		scales: Scales,
		dataFrame: DataFrame,
		drawRect: ViewRect,
	): SGMarkAny {
		const { chartRect } = this
		const { mark } = node
		const { type, table, channels, singleton } = mark
		if (!singleton && !table) {
			throw new Error('marks that are non-singletons must be data-bound')
		}

		const channelNames = this.mapMarkChannels(channels)
		const nodeScales: Scales = this.getNextScaleFrame(
			scales,
			node.scales,
			{
				drawRect,
				chartRect,
			},
			dataFrame,
		)

		const data: any[] = singleton ? [{}] : dataFrame[table as string]
		const items = (data || []).map((row, index) => {
			const item = this.createMarkItem(
				mark,
				row,
				index,
				data,
				channelNames,
				nodeScales,
				dataFrame,
			)
			if (type === MarkType.Group) {
				const groupItem = item as SGGroupItem
				const innerDrawRect = this.calculateInnerDrawRect(groupItem, drawRect)
				const itemScales: Scales = this.getNextScaleFrame(
					nodeScales,
					node.scales,
					{
						drawRect: innerDrawRect,
						chartRect,
					},
					dataFrame,
				)
				groupItem.items = (node.children || []).map(c =>
					this.processNode(
						c,
						{ ...scales, ...nodeScales, ...itemScales },
						dataFrame,
						drawRect,
					),
				)
			}
			return item
		})

		return SG.createMark(type, items)
	}

	/*
	private getBoundDataRows(mark: Mark) {
		const { type, table, singleton, facet } = mark

		if (singleton) {
			return [{}]
		}

		const sourceTable = this.tables[table as string]
		if (facet) {
			const { name, partitionOn } = facet
			const keySet = new Map<string, any[]>()

			sourceTable.forEach(row => {
				const key = partitionOn(row)
				if (!keySet.keys())
			})
			return sourceTable
		} else {
			return sourceTable
		}

		return result
	}*/

	private calculateInnerDrawRect(item: SGGroupItem, drawRect: ViewRect) {
		const left = drawRect.left + (item.x || 0)
		const width = item.width !== undefined ? item.width : (item.x2 || 0) - left
		const right = left + width
		const top = drawRect.top + (item.y || 0)
		const height =
			item.height !== undefined ? item.height : (item.y2 || 0) - top
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
		creators: NamedScaleCreator[],
		partialArgs: Partial<CreateScaleArgs>,
		dataFrame: DataFrame,
	) {
		const result = { ...parentFrame }
		creators.forEach(({ name, table, creator }) => {
			const data = dataFrame[table]
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
