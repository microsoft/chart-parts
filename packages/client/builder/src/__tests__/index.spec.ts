import { MarkType, AxisOrientation } from '@gog/interfaces'
import * as builderModule from '../index'
import { SceneNodeBuilder } from '../SceneNodeBuilder'

describe('The builder module', () => {
	it('contains the correct API', () => {
		expect(builderModule.scene).toBeDefined()
		expect(builderModule.mark).toBeDefined()
		expect(builderModule.axis).toBeDefined()

		// Mork shorthands
		expect(builderModule.arc).toBeDefined()
		expect(builderModule.area).toBeDefined()
		expect(builderModule.group).toBeDefined()
		expect(builderModule.image).toBeDefined()
		expect(builderModule.line).toBeDefined()
		expect(builderModule.path).toBeDefined()
		expect(builderModule.rect).toBeDefined()
		expect(builderModule.rule).toBeDefined()
		expect(builderModule.symbol).toBeDefined()
		expect(builderModule.text).toBeDefined()
		expect(builderModule.trail).toBeDefined()
		expect(builderModule.shape).toBeDefined()
	})

	it('will throw if the child does not define a mark', () => {
		const scene = builderModule.scene((snb: SceneNodeBuilder) => {
			expect(snb).toBeDefined()
			return snb
		})
		expect(() => scene.build()).toThrow(/has no mark set/)
	})

	it('can build a basic scene specification', () => {
		const scene = builderModule.scene((snb: SceneNodeBuilder) => {
			const rect = builderModule.rect().name('test_rect')
			return snb.mark(rect)
		})
		const builtScene = scene.build()
		expect(builtScene).toBeDefined()

		// Outer Group
		expect(builtScene.marks.length).toEqual(1)
		const outerGroup = builtScene.marks[0]
		expect(outerGroup.type).toEqual(MarkType.Group)

		// Rect Group
		expect(outerGroup.child).toBeDefined()
		expect(outerGroup.child.marks.length).toEqual(1)
		const rectGroup = outerGroup.child.marks[0]
		expect(rectGroup.type).toEqual(MarkType.Rect)
	})

	it('encodes the outer rect appropriately', () => {
		const builtScene = builderModule
			.scene(
				(snb: SceneNodeBuilder) => {
					const rect = builderModule.rect().name('test_rect')
					return snb.mark(rect)
				},
				{ width: 100, height: 200 },
				[1, 2],
			)
			.build()

		const outerGroup = builtScene.marks[0]
		expect(outerGroup.encodings.x(undefined, undefined)).toEqual(1)
		expect(outerGroup.encodings.y(undefined, undefined)).toEqual(2)
		expect(outerGroup.encodings.width(undefined, undefined)).toEqual(100)
		expect(outerGroup.encodings.height(undefined, undefined)).toEqual(200)
	})

	it('sets default dimensions on the outer rect', () => {
		const builtScene = builderModule
			.scene((snb: SceneNodeBuilder) => {
				const rect = builderModule.rect().name('test_rect')
				return snb.mark(rect)
			})
			.build()

		const outerGroup = builtScene.marks[0]
		expect(outerGroup.encodings.width(undefined, undefined)).toEqual(250)
		expect(outerGroup.encodings.height(undefined, undefined)).toEqual(250)
	})

	it('can create mark builders for each mark type', () => {
		expect(builderModule.arc()).toBeDefined()
		expect(builderModule.arc('my_arc')).toBeDefined()
		expect(builderModule.area()).toBeDefined()
		expect(builderModule.area('my_area')).toBeDefined()
		expect(builderModule.group()).toBeDefined()
		expect(builderModule.group('my_group')).toBeDefined()
		expect(builderModule.image()).toBeDefined()
		expect(builderModule.image('my_image')).toBeDefined()
		expect(builderModule.line()).toBeDefined()
		expect(builderModule.line('my_line')).toBeDefined()
		expect(builderModule.path()).toBeDefined()
		expect(builderModule.path('my_path')).toBeDefined()
		expect(builderModule.rect()).toBeDefined()
		expect(builderModule.rect('my_rect')).toBeDefined()
		expect(builderModule.rule()).toBeDefined()
		expect(builderModule.rule('my_rule')).toBeDefined()
		expect(builderModule.symbol()).toBeDefined()
		expect(builderModule.symbol('my_symbol')).toBeDefined()
		expect(builderModule.text()).toBeDefined()
		expect(builderModule.text('my_text')).toBeDefined()
		expect(builderModule.trail()).toBeDefined()
		expect(builderModule.trail('my_trail')).toBeDefined()
		expect(builderModule.shape()).toBeDefined()
		expect(builderModule.shape('my_shape')).toBeDefined()
	})

	it('can create axis builders', () => {
		const builder = builderModule.axis('x', AxisOrientation.Bottom)
		expect(builder).toBeDefined()
	})
})
