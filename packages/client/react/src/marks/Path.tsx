import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface PathProps extends CommonMarkProps {
	path?: MarkEncoding
}

export class Path extends BaseMark<PathProps> {
	public markType = MarkType.Path

	protected encodeCustomProperties() {
		const { path } = this.props
		return { path }
	}
}
