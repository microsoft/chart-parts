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
	Pattern,
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
import { VirtualDomNode } from '@gog/marks'

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
vdomMap.set('pattern', Pattern)
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

function createElementFor(
	vdom: VirtualDomNode,
): React.ReactElement<any> | null {
	const { type, children, attrs } = vdom
	const element: Element = React.createElement(type)
	const reactSvgType = vdomMap.get(type)
	if (!reactSvgType) {
		return null
	}

	return React.createElement(
		type,
		attrs,
		(children || []).map(c => createElementFor(c)).filter(t => !!t),
	)
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class ReactDomRenderer {
	public render(vdom: VirtualDomNode): React.ReactElement<any> | null {
		return createElementFor(vdom)
	}
}
