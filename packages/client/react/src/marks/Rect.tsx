import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncodingProp<number>
}

export class Rect extends BaseMark<RectProps> {
	public markType = MarkType.Rect

	protected encodeCustomProperties() {
		return {
			cornerRadius: this.props.cornerRadius,
		}
	}
}
