import * as React from 'react'
import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'
import { ChartNode } from '../ChartNode'

export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncoding
	cornerRadius?: MarkEncoding
	items?: React.ReactChildren
}

// TODO: Handle Mark Children
export class Group extends BaseMark<GroupProps> {
	public markType = MarkType.Group

	protected encodeCustomProperties() {
		const { clip, cornerRadius } = this.props
		return {
			clip,
			cornerRadius,
		}
	}

	protected renderInner() {
		console.log('Render Inner')
		return <ChartNode>{this.props.children}</ChartNode>
	}
}
