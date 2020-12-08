/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
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

const elementMap: Map<string, any> = new Map<string, React.Component>()
elementMap.set('circle', Circle)
elementMap.set('clipPath', ClipPath)
elementMap.set('defs', Defs)
elementMap.set('ellipse', Ellipse)
elementMap.set('g', G)
elementMap.set('image', Image)
elementMap.set('line', Line)
elementMap.set('linearGradient', LinearGradient)
elementMap.set('path', Path)
// vdomMap.set('pattern', Pattern)
elementMap.set('polygon', Polygon)
elementMap.set('polyline', Polyline)
elementMap.set('radialGradient', RadialGradient)
elementMap.set('rect', Rect)
elementMap.set('svg', Svg)
elementMap.set('text', Text)
elementMap.set('textPath', TextPath)
elementMap.set('tspan', TSpan)
elementMap.set('use', Use)
elementMap.set('stop', Stop)
elementMap.set('symbol', Symbol)
export default elementMap
