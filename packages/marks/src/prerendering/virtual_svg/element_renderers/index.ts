import { registerRenderer } from './registry'
import { RectRenderer } from './RectRenderer'

registerRenderer('rect', new RectRenderer())

export * from './registry'
