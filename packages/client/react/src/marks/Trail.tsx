import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TrailProps extends CommonMarkProps {
	size?: MarkEncoding
	defined?: MarkEncoding
}

export class Trail extends BaseMark<TrailProps> {
	public markType = MarkType.Trail

	protected encodeCustomProperties() {
		const { size, defined } = this.props
		return { size, defined }
	}
}
