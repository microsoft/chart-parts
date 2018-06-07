import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { MarkType } from '@gog/mark-interfaces'
import {
	MarkSpec,
	SceneSpec,
	MarkEncodings,
	Scales,
} from '@gog/mark-spec-interfaces'
import * as SG from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

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
	): SGMark<SGItem> {
		const scales = createScales(data, scene, options)
		const groupChildren = scene.marks.map(mark =>
			createMarkNode(mark, data, scales),
		)
		return createFrame(groupChildren)
	}
}

function createScales<Data>(
	data: Data[],
	scene: SceneSpec,
	options: ChartOptions,
) {
	const { width, height } = options
	const chartRect = {
		left: 0,
		top: 0,
		right: width,
		bottom: height,
	}
	const drawRect = chartRect

	const scales = {}
	scene.scales.forEach(({ scaleCreator, name }) => {
		const scale = scaleCreator({ drawRect, chartRect, data, scales })
		scales[name] = scale
	})
	return scales
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

function createMarkNode(
	mark: MarkSpec,
	data: any[],
	scales: Scales,
): SGMarkAny {
	const { type, encodings } = mark
	const items = data.map(row =>
		SG.createItem(type, transferEncodings(row, encodings, scales)),
	)

	/**
	 * TODO: Handle group item encoding
	 */

	return SG.createMark(type, items)
}

function transferEncodings(row: any, encodings: MarkEncodings, scales: Scales) {
	const props: { [key: string]: any } = {}
	Object.keys(encodings)
		.filter(t => t !== 'items')
		.forEach(key => {
			const encoding = encodings[key]
			const encodingValue =
				typeof encoding === 'function' ? encoding({ row, scales }) : encoding
			props[key] = encodingValue
		})
	return props
}
