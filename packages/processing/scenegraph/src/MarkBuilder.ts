/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, SGItem, SGMark } from '@chart-parts/interfaces'
import { createItem, createMark } from './factory'

export class MarkBuilder {
	private itemsValue: SGItem[] = []
	private clipValue?: boolean
	private interactiveValue?: boolean
	private roleValue?: string
	private nameValue?: string
	private zIndexValue?: number

	public constructor(public markType: MarkType) {}

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
		result.clip = this.clipValue
		result.interactive = this.interactiveValue
		result.role = this.roleValue
		result.name = this.nameValue
		result.zIndex = this.zIndexValue
		return result
	}
}
