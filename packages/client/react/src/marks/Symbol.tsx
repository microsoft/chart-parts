import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface SymbolProps extends CommonMarkProps {
	size?: MarkEncodingProp
	shape?: MarkEncodingProp
}

export class Symbol extends BaseMark<SymbolProps> {
	public markType = MarkType.Symbol

	protected encodeCustomProperties() {
		const { size, shape } = this.props
		return { size, shape }
	}
}
