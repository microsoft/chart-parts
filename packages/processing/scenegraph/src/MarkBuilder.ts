import { MarkType, SGItem, SGMark } from '@gog/interfaces'
import { createItem, createMark } from './factory'

export class MarkBuilder {
	private itemsValue: SGItem[] = []
	private clipValue?: boolean
	private interactiveValue?: boolean
	private roleValue?: string
	private nameValue?: string
	private zIndexValue?: number

	constructor(public markType: MarkType) {}

	public items(...values: any[]): MarkBuilder {
		this.itemsValue.push(
			...values.map(itemProps => createItem(this.markType, itemProps)),
		)
		return this
	}

	public clip(value?: boolean): MarkBuilder {
		this.clipValue = value
		return this
	}

	public interactive(value?: boolean): MarkBuilder {
		this.interactiveValue = value
		return this
	}

	public role(value?: string): MarkBuilder {
		this.roleValue = value
		return this
	}

	public name(value?: string): MarkBuilder {
		this.nameValue = value
		return this
	}

	public zIndex(value?: number): MarkBuilder {
		this.zIndexValue = value
		return this
	}

	public build(): SGMark<any> {
		const result = createMark(this.markType, this.itemsValue)
		if (this.clipValue != null) {
			result.clip = this.clipValue
		}
		if (this.clipValue != null) {
			result.interactive = this.interactiveValue
		}
		if (this.roleValue != null) {
			result.role = this.roleValue
		}
		if (this.nameValue != null) {
			result.name = this.nameValue
		}
		if (this.zIndexValue != null) {
			result.zIndex = this.zIndexValue
		}
		return result
	}
}
