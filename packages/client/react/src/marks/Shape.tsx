import { MarkType, MarkEncoding } from '@gog/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ShapeProps extends CommonMarkProps {
	itemtype?: MarkEncoding
}

export class Shape extends BaseMark<ShapeProps> {
	public markType = MarkType.Shape

	protected encodeCustomProperties() {
		return {}
	}
}
