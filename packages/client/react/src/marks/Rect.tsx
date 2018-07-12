import { MarkType } from '@gog/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncodingProp
}

export class Rect extends BaseMark<RectProps> {
	public markType = MarkType.Rect

	protected encodeCustomProperties() {
		return {
			cornerRadius: this.props.cornerRadius,
		}
	}
}
