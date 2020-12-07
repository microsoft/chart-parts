/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as lib from '../index'

describe('The scenegraph library', () => {
	it('has correct exports', () => {
		expect(lib.parseScene).toBeDefined()
		expect(lib.registerItemType).toBeDefined()
		expect(lib.sceneToJSON).toBeDefined()
	})
})
