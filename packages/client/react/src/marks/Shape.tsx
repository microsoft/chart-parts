import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ShapeProps extends CommonMarkProps {
	itemtype?: MarkEncodingProp
}

export class Shape extends BaseMark<ShapeProps> {
	public markType = MarkType.Shape

	protected encodeCustomProperties() {
		return {}
	}
}
