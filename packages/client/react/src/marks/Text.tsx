import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TextProps extends CommonMarkProps {
	align?: MarkEncoding
	angle?: MarkEncoding
	baseline?: MarkEncoding
	dir?: MarkEncoding
	dx?: MarkEncoding
	dy?: MarkEncoding
	ellipsis?: MarkEncoding
	font?: MarkEncoding
	fontSize?: MarkEncoding
	fontWeight?: MarkEncoding
	fontVariant?: MarkEncoding
	fontStyle?: MarkEncoding
	limit?: MarkEncoding
	radius?: MarkEncoding
	text?: MarkEncoding
	theta?: MarkEncoding
}

export class Text extends BaseMark<TextProps> {
	public markType = MarkType.Text

	protected encodeCustomProperties() {
		const {
			align,
			angle,
			baseline,
			dir,
			dx,
			dy,
			ellipsis,
			font,
			fontSize,
			fontWeight,
			fontVariant,
			fontStyle,
			limit,
			radius,
			text,
			theta,
		} = this.props
		return {
			align,
			angle,
			baseline,
			dir,
			dx,
			dy,
			ellipsis,
			font,
			fontSize,
			fontWeight,
			fontVariant,
			fontStyle,
			limit,
			radius,
			text,
			theta,
		}
	}
}
