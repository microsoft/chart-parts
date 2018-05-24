import { Arc } from './Arc'
import { Area } from './Area'
import { Group } from './Group'
import { Image } from './Image'
import { Line } from './Line'
import { Path } from './Path'
import { Rect } from './Rect'
import { Rule } from './Rule'
import { Symbol } from './Symbol'
import { Text } from './Text'
import { Trail } from './Trail'

// Register the core item types
import { registerItemType } from '../ItemRegistry'
registerItemType(Arc)
registerItemType(Area)
registerItemType(Group)
registerItemType(Image)
registerItemType(Line)
registerItemType(Path)
registerItemType(Rect)
registerItemType(Rule)
registerItemType(Symbol)
registerItemType(Text)
registerItemType(Trail)

export * from './Item'
export { Arc, Area, Group, Image, Line, Path, Rect, Rule, Symbol, Text, Trail }
