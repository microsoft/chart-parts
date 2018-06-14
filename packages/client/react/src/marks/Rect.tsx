import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncoding
}

export class Rect extends BaseMark<RectProps> {
	public markType = MarkType.Rect

	protected encodeCustomProperties() {
		return {
			cornerRadius: this.props.cornerRadius,
		}
	}
}
