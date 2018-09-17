import { MarkType } from '@markable/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export type RuleProps = CommonMarkProps

export class Rule extends BaseMark<RuleProps> {
	public markType = MarkType.Rule

	protected encodeCustomProperties() {
		return {}
	}
}
