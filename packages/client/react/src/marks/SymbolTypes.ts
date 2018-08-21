// tslint:disable max-classes-per-file
import { MarkType, SymbolType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface SymbolOfTypeProps extends CommonMarkProps {
	size?: MarkEncodingProp
}

abstract class SymbolOfType extends BaseMark<SymbolOfTypeProps> {
	public markType = MarkType.Symbol

	protected abstract getShape(): SymbolType

	protected encodeCustomProperties() {
		const { size } = this.props
		const shape = this.getShape()
		return { size, shape }
	}
}

export class Circle extends SymbolOfType {
	protected getShape() {
		return SymbolType.Circle
	}
}

export class Cross extends SymbolOfType {
	protected getShape() {
		return SymbolType.Cross
	}
}

export class Diamond extends SymbolOfType {
	protected getShape() {
		return SymbolType.Diamond
	}
}

export class Square extends SymbolOfType {
	protected getShape() {
		return SymbolType.Square
	}
}

export class TriangleDown extends SymbolOfType {
	protected getShape() {
		return SymbolType.TriangleDown
	}
}

export class TriangleUp extends SymbolOfType {
	protected getShape() {
		return SymbolType.TriangleUp
	}
}

export class TriangleLeft extends SymbolOfType {
	protected getShape() {
		return SymbolType.TriangleLeft
	}
}

export class TriangleRight extends SymbolOfType {
	protected getShape() {
		return SymbolType.Circle
	}
}
