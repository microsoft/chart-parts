import { MarkType, SymbolType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface SymbolProps extends CommonMarkProps {
	size?: MarkEncodingProp<number>
	shape?: MarkEncodingProp<SymbolType | string>
}

export class Symbol extends BaseMark<SymbolProps> {
	public markType = MarkType.Symbol

	protected encodeCustomProperties() {
		const { size, shape } = this.props
		return { size, shape }
	}
}
