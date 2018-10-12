/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { registerRenderer } from './registry'

import { ArcRenderer } from './ArcRenderer'
import { AreaRenderer } from './AreaRenderer'
import { GroupRenderer } from './GroupRenderer'
import { LineRenderer } from './LineRenderer'
import { PathRenderer } from './PathRenderer'
import { RectRenderer } from './RectRenderer'
import { RuleRenderer } from './RuleRenderer'
import { SymbolRenderer } from './SymbolRenderer'
import { TextRenderer } from './TextRenderer'

registerRenderer(MarkType.Arc, new ArcRenderer())
registerRenderer(MarkType.Area, new AreaRenderer())
registerRenderer(MarkType.Group, new GroupRenderer())
registerRenderer(MarkType.Line, new LineRenderer())
registerRenderer(MarkType.Path, new PathRenderer())
registerRenderer(MarkType.Rect, new RectRenderer())
registerRenderer(MarkType.Rule, new RuleRenderer())
registerRenderer(MarkType.Symbol, new SymbolRenderer())
registerRenderer(MarkType.Text, new TextRenderer())

export * from './registry'
