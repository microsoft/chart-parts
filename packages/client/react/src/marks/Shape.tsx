import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
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
