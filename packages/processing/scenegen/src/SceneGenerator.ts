// tslint:disable max-classes-per-file no-this-assignment
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { MarkType } from '@gog/mark-interfaces'
import {
	MarkSpec,
	SceneSpec,
	MarkEncodings,
	Scales,
	Transformer,
} from '@gog/mark-spec-interfaces'
import * as SG from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

/**
 * Interface for the result of scene-generation
 */
export interface GeneratedScene {
	/**
	 * The root mark of the resultant scene
	 */
	root: SGMark<SGItem>

	/**
	 * The event channels of this scene, a key of channel name to event handlers
	 */
	channelHandlers: { [key: string]: (arg: any) => void }
}

/**
 * The scene generator class
 */
export class SceneGenerator<Data> {
	/**
	 * Generates a scenegraph instance given data and a scene specification
	 * @param scene The scene specification
	 * @param data The data to bind with
	 * @param options The charting options
	 */
	public generateScene(
		scene: SceneSpec,
		data: Data[],
		options: ChartOptions,
	): GeneratedScene {
		return new Scene(scene, data, options).build()
	}
}

class Scene<Data> {
	/**
	 * The latest channel name
	 */
	private channelId: number = 0
	private channelHandlers: { [key: string]: (arg: any) => void } = {}

	constructor(
		private scene: SceneSpec,
		private data: Data[],
		private options: ChartOptions,
	) {}

	public build() {
		const { scene, channelHandlers } = this
		const scales = this.createScales()
		const groupChildren = scene.marks.map(m => this.createMarkNode(m, scales))
		const root = createFrame(groupChildren)
		return { root, channelHandlers }
	}

	/**
	 * Invokes the scale-creators for this scene instance, creating new
	 * scale instances
	 */
	private createScales() {
		const {
			options: { width, height },
			scene,
			data,
		} = this
		const chartRect = {
			left: 0,
			top: 0,
			right: width || 250,
			bottom: height || 250,
		}
		const drawRect = chartRect

		const scales: { [key: string]: Transformer<any, any> } = {}
		scene.scales.forEach(({ scaleCreator, name }) => {
			const scale = scaleCreator({ drawRect, chartRect, data, scales })
			scales[name] = scale
		})
		return scales
	}

	private createMarkNode(mark: MarkSpec, scales: Scales): SGMarkAny {
		const { data } = this
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
				...this.transferEncodings(row, index, encodings, scales),
				metadata: { dataRowIndex: index },
				channels: channelNames,
			}),
		)

		/**
		 * TODO: Handle group item encoding
		 */

		return SG.createMark(type, items)
	}

	private transferEncodings(
		row: any,
		rowIndex: number,
		encodings: MarkEncodings,
		scales: Scales,
	) {
		const { data } = this
		const props: { [key: string]: any } = {}
		Object.keys(encodings)
			.filter(t => t !== 'items')
			.forEach(key => {
				const encoding = encodings[key]
				const encodingValue =
					typeof encoding === 'function'
						? encoding({ row, rowIndex, scales, data })
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
