// tslint:disable no-this-assignment no-submodule-imports no-var-requires
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { MarkType } from '@gog/mark-interfaces'
import {
	Mark as MarkSpec,
	Scene as SceneSpec,
	MarkEncodings,
	Scale,
} from '@gog/mark-spec-interfaces'
import * as SG from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

export class SceneInstance {
	/**
	 * The latest channel name
	 */
	private channelId: number = 0
	private channelHandlers: { [key: string]: (arg: any) => void } = {}
	private scales: { [key: string]: Scale<any, any> } = {}

	constructor(private scene: SceneSpec, private options: ChartOptions) {}

	public build() {
		const { width, height } = this.options
		const chartRect = {
			left: 0,
			top: 0,
			right: width || 250,
			bottom: height || 250,
		}
		// TODO: change this when processing a group
		const drawRect = chartRect
		const rootMarks: SGMarkAny[] = []

		this.scene.nodes.forEach(({ marks, scales, data }) => {
			// Create scales for the scene node
			scales.forEach(({ scaleCreator, name }) => {
				this.scales[name] = scaleCreator({
					drawRect,
					chartRect,
					scales: this.scales,
					data,
				})
			})

			// Create the marks for the scene node. This is done in one pass because these marks
			// should only depend on the scales created in this context
			rootMarks.push(...marks.map(mark => this.createMarkNode(mark, data)))
		})

		return {
			root: createFrame(rootMarks),
			channelHandlers: this.channelHandlers,
		}
	}

	private createMarkNode(mark: MarkSpec, data: any[]): SGMarkAny {
		const { type, encodings, channels } = mark

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

		const items = data.map((row, index) =>
			SG.createItem(type, {
				...this.transferEncodings(row, index, encodings, data),
				metadata: { dataRowIndex: index },
				channels: channelNames,
			}),
		)

		// TODO: Handle group item encoding
		return SG.createMark(type, items)
	}

	private transferEncodings(
		row: any,
		rowIndex: number,
		encodings: MarkEncodings,
		data: any[],
	) {
		const props: { [key: string]: any } = {}
		Object.keys(encodings)
			.filter(t => t !== 'items')
			.forEach(key => {
				const encoding = encodings[key]
				const encodingValue =
					typeof encoding === 'function'
						? encoding({ row, rowIndex, scales: this.scales, data })
						: encoding
				props[key] = encodingValue
			})
		return props
	}
}

function createFrame(items: SGMarkAny[]): SGMarkAny {
	const groupItem = SG.createItem(MarkType.Group) as SGGroupItem
	groupItem.items = items

	const group = SG.createMark(MarkType.Group, [groupItem])
	group.role = 'frame'
	group.name = 'root'
	group.zIndex = 0
	return group
}
