import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SGMark, SGItem, SGGroupItem } from '@gog/scenegraph-interfaces'
import { MarkType } from '@gog/mark-interfaces'
import {
	MarkSpec,
	SceneSpec,
	MarkEncodings,
	ScaleHash,
} from '@gog/mark-spec-interfaces'
import * as SG from '@gog/scenegraph'

type SGMarkAny = SGMark<SGItem>

export class SceneGenerator<Data> {
	public generateScene(
		data: Data[],
		scene: SceneSpec,
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
	const drawRect = {
		left: 0,
		right: width,
		top: 0,
		bottom: height,
	}
	const chartRect = {
		left: 0,
		right: width,
		top: 0,
		bottom: height,
	}

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
	scales: ScaleHash,
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

function transferEncodings(
	row: any,
	encodings: MarkEncodings,
	scales: ScaleHash,
) {
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
