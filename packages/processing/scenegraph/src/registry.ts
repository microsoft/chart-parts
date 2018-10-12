/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Item } from './elements'

export interface ItemConstructor {
	ITEM_TYPE: string
	new (): Item
}

const itemTypeRegistry = new Map<string, ItemConstructor>()
const restrictedPropNames = new Set<string>()
restrictedPropNames.add('marktype')

/**
 * Registers an item type for use in parsing scene-graphs.
 *
 * @param itemType the name of the item type to register
 * @param ctor The item class representing the item type
 */
export function registerItemType(ctor: ItemConstructor) {
	itemTypeRegistry.set(ctor.ITEM_TYPE, ctor)
}

/**
 * Creates a new Item-Type instance
 * @param itemType
 */
export function createItemType(
	itemType: string,
	props: { [key: string]: any } = {},
) {
	if (!itemTypeRegistry.has(itemType)) {
		throw new Error(`item type ${itemType} not found`)
	}
	const ctor = itemTypeRegistry.get(itemType)
	if (ctor === undefined) {
		throw new Error(`item type ${itemType} constructor not valid`)
	}

	// Create the new instance
	const instance = new ctor()

	// Transfer properties over
	Object.keys(props).forEach(propName => {
		if (!restrictedPropNames.has(propName)) {
			;(instance as any)[propName] = props[propName]
		}
	})
	return instance
}
