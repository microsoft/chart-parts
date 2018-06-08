import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface SymbolProps extends CommonMarkProps {
	size?: MarkEncoding
	shape?: MarkEncoding
}

export class Symbol extends BaseMark<SymbolProps> {
	public markType = MarkType.Symbol

	protected encodeCustomProperties() {
		const { size, shape } = this.props
		return { size, shape }
	}
}
