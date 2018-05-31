import * as React from 'react'
import {
	Circle,
	ClipPath,
	Defs,
	Ellipse,
	G,
	Image,
	Line,
	LinearGradient,
	Path,
	// Pattern,
	Polygon,
	Polyline,
	RadialGradient,
	Rect,
	Svg,
	Text,
	TextPath,
	TSpan,
	Use,
	Stop,
	Symbol,
} from 'react-native-svg'

const vdomMap: Map<string, any> = new Map<string, React.Component>()
vdomMap.set('circle', Circle)
vdomMap.set('clipPath', ClipPath)
vdomMap.set('devs', Defs)
vdomMap.set('ellipse', Ellipse)
vdomMap.set('g', G)
vdomMap.set('image', Image)
vdomMap.set('line', Line)
vdomMap.set('linearGradient', LinearGradient)
vdomMap.set('path', Path)
// vdomMap.set('pattern', Pattern)
vdomMap.set('polygon', Polygon)
vdomMap.set('polyline', Polyline)
vdomMap.set('radialGradient', RadialGradient)
vdomMap.set('rect', Rect)
vdomMap.set('svg', Svg)
vdomMap.set('text', Text)
vdomMap.set('textPath', TextPath)
vdomMap.set('tspan', TSpan)
vdomMap.set('use', Use)
vdomMap.set('stop', Stop)
vdomMap.set('symbol', Symbol)
export default vdomMap
