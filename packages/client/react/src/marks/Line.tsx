import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface LineProps extends CommonMarkProps {
	interpolate?: MarkEncoding
	tension?: MarkEncoding
	defined?: MarkEncoding
}

export class Line extends BaseMark<LineProps> {
	public markType = MarkType.Line

	protected encodeCustomProperties() {
		const { interpolate, tension, defined } = this.props
		return { interpolate, tension, defined }
	}
}
