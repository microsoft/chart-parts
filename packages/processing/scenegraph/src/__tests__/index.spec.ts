import * as lib from '../index'

describe('The scenegraph library', () => {
	it('has correct exports', () => {
		expect(lib.parseScene).toBeDefined()
		expect(lib.registerItemType).toBeDefined()
		expect(lib.sceneToJSON).toBeDefined()
	})
})
