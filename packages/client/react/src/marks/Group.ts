import { MarkType, Facet } from '@chart-parts/interfaces'
import { SceneNodeBuilder, MarkBuilder } from '@chart-parts/builder'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncodingProp<boolean>
	cornerRadius?: MarkEncodingProp<number>
	facet?: Facet
}

export class Group extends BaseMark<GroupProps> {
	public markType = MarkType.Group

	protected encodeCustomProperties() {
		const { clip, cornerRadius } = this.props
		return {
			clip,
			cornerRadius,
		}
	}

	protected addMark(): SceneNodeBuilder {
		let node: SceneNodeBuilder | undefined
		this.api.mark(this.createMark().child(n => (node = n)))
		return node as any
	}

	protected createMark(): MarkBuilder {
		const nodeBuilder = super.createMark()
		const { facet } = this.props

		if (facet) {
			nodeBuilder.facet(facet)
		}

		return nodeBuilder
	}
}
