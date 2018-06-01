import { registerRenderer } from './registry'
import { RectRenderer } from './RectRenderer'
import { ArcRenderer } from './ArcRenderer'

registerRenderer(RectRenderer.TARGET_MARK_TYPE, new RectRenderer())
registerRenderer(ArcRenderer.TARGET_MARK_TYPE, new ArcRenderer())

export * from './registry'
