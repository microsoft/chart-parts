import { MarkType } from '@gog/interfaces'
import { registerRenderer } from './registry'

import { ArcRenderer } from './ArcRenderer'
import { AreaRenderer } from './AreaRenderer'
import { GroupRenderer } from './GroupRenderer'
import { ImageRenderer } from './ImageRenderer'
import { LineRenderer } from './LineRenderer'
import { PathRenderer } from './PathRenderer'
import { RectRenderer } from './RectRenderer'
import { RuleRenderer } from './RuleRenderer'
import { SymbolRenderer } from './SymbolRenderer'
import { TextRenderer } from './TextRenderer'
import { TrailRenderer } from './TrailRenderer'
import { ShapeRenderer } from './ShapeRenderer'

registerRenderer(MarkType.Arc, new ArcRenderer())
registerRenderer(MarkType.Area, new AreaRenderer())
registerRenderer(MarkType.Group, new GroupRenderer())
registerRenderer(MarkType.Image, new ImageRenderer())
registerRenderer(MarkType.Line, new LineRenderer())
registerRenderer(MarkType.Path, new PathRenderer())
registerRenderer(MarkType.Rect, new RectRenderer())
registerRenderer(MarkType.Rule, new RuleRenderer())
registerRenderer(MarkType.Shape, new ShapeRenderer())
registerRenderer(MarkType.Symbol, new SymbolRenderer())
registerRenderer(MarkType.Text, new TextRenderer())
registerRenderer(MarkType.Trail, new TrailRenderer())

export * from './registry'
