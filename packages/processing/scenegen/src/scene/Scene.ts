// tslint:disable no-this-assignment no-submodule-imports no-var-requires
import {
	ChartOptions,
	SGMark,
	SGItem,
	SGGroupItem,
	MarkType,
	SceneNode,
	DataFrame,
	ChannelHandler,
	Mark,
} from '@gog/interfaces'
import { getItemSpace } from '@gog/util'
import { ChartOptionsManager } from './ChartOptionsManager'
import {
	getBoundData,
	getNextDrawRect,
	createMarkItem,
	FacetPartitions,
} from './util'
import { SceneFrame } from './SceneFrame'
import { createMark } from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

export class Scene {
	private channelId: number = 0
	private channelHandlers: { [key: string]: ChannelHandler } = {}
	private options: ChartOptionsManager

	constructor(private scene: SceneNode, options: ChartOptions) {
		this.options = new ChartOptionsManager(options)
	}

	/**
	 * Builds a new scenegraph instance by binding data to a scene specification.
	 *
	 * @param data The data to bind with
	 */
	public build(data: DataFrame) {
		const width = this.options.chartSpace.shape.width as number
		const height = this.options.chartSpace.shape.height as number
		const emptyNode = (undefined as any) as SceneNode
		const rootFrame = new SceneFrame(emptyNode, undefined, data, {
			width,
			height,
		})

		return {
			root: this.processNode(this.scene, rootFrame)[0],
			channelHandlers: this.channelHandlers,
		}
	}

	/**
	 * Processes a scene specification node into the SceneGraph model
	 * @param node The scene node to process
	 * @param scaleFrame The scales available for the given scene node
	 */
	private processNode(node: SceneNode, parentFrame: SceneFrame): SGMarkAny[] {
		const { marks } = node

		// Push the new node, which registers channels and recomputes scales
		const frame = parentFrame.pushNode(node)

		return marks.map(mark => {
			const markFrame = frame.pushMark(mark, h => this.registerHandler(h))
			/**
			 * If the data is a faceted group, then bind one group per facet.
			 */
			const boundData = getBoundData(mark, markFrame.data)
			const items = Array.isArray(boundData)
				? this.createItemPerDataRow(markFrame, boundData)
				: this.createItemPerFacet(markFrame, boundData)
			return createMark(mark.type, items)
		})
	}

	/**
	 * Creates one scenegraph item per facet partition
	 *
	 * @param frame The current scene frame
	 * @param partitions the item faceting configuration
	 */
	private createItemPerFacet(
		frame: SceneFrame,
		{ name, partitions }: FacetPartitions,
	) {
		return partitions.map((partition, index) => {
			return this.createBoundItem(
				frame.pushData({ [name]: partition }),
				partition,
				index,
				partitions,
			)
		})
	}

	/**
	 * Creates one sceengraph item per row in a data-table
	 * @param frame The current scene frame
	 * @param data The data table
	 */
	private createItemPerDataRow(frame: SceneFrame, data: any[]) {
		return data.map((row, index) =>
			this.createBoundItem(frame, row, index, data),
		)
	}

	/**
	 * Creates a scenegraph item bound to a data row
	 *
	 * @param frame The current scene frame
	 * @param row The data row
	 * @param index The data row index
	 * @param table The data table
	 */
	private createBoundItem(
		frame: SceneFrame,
		row: any,
		index: number,
		table: any[],
	) {
		const mark = frame.mark as Mark

		const item = createMarkItem(mark, row, index, table, frame)
		if (mark.type !== MarkType.Group) {
			return item
		}

		// Update the view and recompute scales
		const groupDrawRect = getNextDrawRect(getItemSpace(item), frame.view)
		const itemFrame = frame.pushView({
			width: groupDrawRect.right - groupDrawRect.left,
			height: groupDrawRect.bottom - groupDrawRect.top,
		})

		// Mash in the children and the bounds
		const groupItem: SGGroupItem = {
			...item,
			items: mark.child ? this.processNode(mark.child, itemFrame) : [],
			x: groupDrawRect.left,
			y: groupDrawRect.top,
			x2: groupDrawRect.right,
			y2: groupDrawRect.bottom,
		}
		return groupItem
	}

	private registerHandler(handler: ChannelHandler) {
		const id = `evt${this.channelId++}`
		this.channelHandlers[id] = handler
		return id
	}
}
