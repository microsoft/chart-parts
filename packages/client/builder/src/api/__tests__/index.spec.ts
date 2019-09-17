/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, AxisOrientation } from '@chart-parts/interfaces'
import {
	scene,
	arc,
	area,
	group,
	rect,
	mark,
	axis,
	image,
	line,
	path,
	rule,
	symbol,
	text,
	shape,
	trail,
} from '../../index'
import { SceneNodeBuilder } from '../SceneNodeBuilder'
const view = { width: 100, height: 200 }

describe('The builder module', () => {
	it('contains the correct API', () => {
		expect(scene).toBeDefined()
		expect(mark).toBeDefined()
		expect(axis).toBeDefined()

		// Mork shorthands
		expect(arc).toBeDefined()
		expect(area).toBeDefined()
		expect(group).toBeDefined()
		expect(image).toBeDefined()
		expect(line).toBeDefined()
		expect(path).toBeDefined()
		expect(rect).toBeDefined()
		expect(rule).toBeDefined()
		expect(symbol).toBeDefined()
		expect(text).toBeDefined()
		expect(trail).toBeDefined()
		expect(shape).toBeDefined()
	})

	it('can build a basic scene specification', () => {
		const sc = scene(
			(snb: SceneNodeBuilder) => snb.mark(rect().name('test_rect')),
			view,
		)
		const builtScene = sc.build()
		expect(builtScene).toBeDefined()

		// Outer Group
		expect(builtScene.marks.length).toEqual(1)
		const outerGroup = builtScene.marks[0]
		expect(outerGroup.type).toEqual(MarkType.Group)

		// Rect Group
		expect(outerGroup.child).toBeDefined()
		expect((outerGroup.child as any).marks.length).toEqual(1)
		const rectGroup = (outerGroup.child as any).marks[0]
		expect(rectGroup.type).toEqual(MarkType.Rect)
	})

	it('encodes the outer rect appropriately', () => {
		const builtScene = scene(
			(snb: SceneNodeBuilder) => snb.mark(rect().name('test_rect')),
			view,
		).build()

		const outerGroup = builtScene.marks[0]
		expect((outerGroup.encodings as any).width).toEqual(100)
		expect((outerGroup.encodings as any).height).toEqual(200)
	})

	it('sets default dimensions on the outer rect', () => {
		// default view bounds
		const builtScene = scene(
			(snb: SceneNodeBuilder) => snb.mark(rect().name('`test_rect')),
			{ width: 250, height: 250 },
		).build()

		const outerGroup = builtScene.marks[0]
		expect((outerGroup.encodings as any).width).toEqual(250)
		expect((outerGroup.encodings as any).height).toEqual(250)
	})

	it('can create mark builders for each mark type', () => {
		expect(arc()).toBeDefined()
		expect(arc('my_arc')).toBeDefined()
		expect(area()).toBeDefined()
		expect(area('my_area')).toBeDefined()
		expect(group()).toBeDefined()
		expect(group('my_group')).toBeDefined()
		expect(image()).toBeDefined()
		expect(image('my_image')).toBeDefined()
		expect(line()).toBeDefined()
		expect(line('my_line')).toBeDefined()
		expect(path()).toBeDefined()
		expect(path('my_path')).toBeDefined()
		expect(rect()).toBeDefined()
		expect(rect('my_rect')).toBeDefined()
		expect(rule()).toBeDefined()
		expect(rule('my_rule')).toBeDefined()
		expect(symbol()).toBeDefined()
		expect(symbol('my_symbol')).toBeDefined()
		expect(text()).toBeDefined()
		expect(text('my_text')).toBeDefined()
		expect(trail()).toBeDefined()
		expect(trail('my_trail')).toBeDefined()
		expect(shape()).toBeDefined()
		expect(shape('my_shape')).toBeDefined()
	})

	it('can create axis builders', () => {
		const builder = axis('x', AxisOrientation.Bottom)
		expect(builder).toBeDefined()
	})
})
