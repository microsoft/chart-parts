/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import ArcTester from './arc-tester'
import AreaTesterHorizontal from './area-tester-horizontal'
import AreaTesterVertical from './area-tester-vertical'
import GroupTester from './group-tester'
import LineTester from './line-tester'
import PathTester from './path-tester'
import RectTester from './rect-tester'
import RuleTester from './rule-tester'
import TextTester from './text-tester'
import SymbolTesterArea from './symbol-tester-area'
import SymbolTesterWidth from './symbol-tester-width'

export default {
	'arc-tester': ArcTester,
	'area-tester-horizontal': AreaTesterHorizontal,
	'area-tester-vertical': AreaTesterVertical,
	'group-tester': GroupTester,
	'line-tester': LineTester,
	'path-tester': PathTester,
	'rect-tester': RectTester,
	'rule-tester': RuleTester,
	'text-tester': TextTester,
	'symbol-tester-area': SymbolTesterArea,
	'symbol-tester-width': SymbolTesterWidth,
}
