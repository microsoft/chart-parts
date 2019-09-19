/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { SceneBuilderContext } from '../Context'
import { MarkType } from '@chart-parts/interfaces'
import {
	mark as newMark,
	MarkBuilder,
	SceneNodeBuilder,
} from '@chart-parts/builder'
import { CommonMarkProps } from '../types'
import { MarkEncodingKey } from '@chart-parts/interfaces'

/**
 * A factory function for creating mark components
 * @param markType The mark type to create
 * @param customHook An optional custom hook to use when themark is created
 * @ignore
 */
export function createMarkComponent<T extends CommonMarkProps>(
	markType: MarkType,
	customHook: (mark: MarkBuilder, props: T) => void = () => null,
): React.FC<T> {
	const result: React.FC<T> = props => {
		const { children, table, name, role } = props
		const scene = useContext(SceneBuilderContext)
		const mark = useMemo(() => newMark(markType), [markType])
		useCommonMarkProperties(mark, table, role, name)
		useMarkEncodings(mark, props)
		useMarkChannels(mark, props)
		customHook(mark, props as T)
		const node = useMarkInScene(scene, mark, markType === MarkType.Group)
		return (
			<SceneBuilderContext.Provider value={node}>
				{children}
			</SceneBuilderContext.Provider>
		)
	}
	result.displayName = markType
	return result
}

function useMarkInScene(
	scene: SceneNodeBuilder | undefined,
	mark: MarkBuilder,
	pushdown: boolean,
) {
	const [currentScene, setCurrentScene] = useState<
		SceneNodeBuilder | undefined
	>()
	useEffect(() => {
		if (scene && mark) {
			if (pushdown) {
				// push down a new scene
				scene.mark(mark.child(n => setCurrentScene(n)))
			} else {
				// keep the same scene
				setCurrentScene(scene.mark(mark))
			}
			return () => {
				scene.removeMark(mark)
			}
		}
	}, [scene, mark])
	return currentScene
}

function useCommonMarkProperties(
	mark: MarkBuilder,
	table: string | undefined,
	role: string | undefined,
	name: string | undefined,
) {
	useEffect(() => {
		if (mark) {
			mark.table(table)
		}
	}, [mark, table])

	useEffect(() => {
		if (mark) {
			mark.name(name)
		}
	}, [mark, name])

	useEffect(() => {
		if (mark) {
			mark.role(role)
		}
	}, [mark, role])
}

function useMarkEncodings(mark: MarkBuilder, props: CommonMarkProps) {
	useEffect(() => {
		mark.encode(MarkEncodingKey.x, props.x)
	}, [mark, props.x])
	useEffect(() => {
		mark.encode(MarkEncodingKey.x2, props.x2)
	}, [mark, props.x2])
	useEffect(() => {
		mark.encode(MarkEncodingKey.xc, props.xc)
	}, [mark, props.xc])
	useEffect(() => {
		mark.encode(MarkEncodingKey.width, props.width)
	}, [mark, props.width])
	useEffect(() => {
		mark.encode(MarkEncodingKey.y, props.y)
	}, [mark, props.y])
	useEffect(() => {
		mark.encode(MarkEncodingKey.y2, props.y2)
	}, [mark, props.y2])
	useEffect(() => {
		mark.encode(MarkEncodingKey.yc, props.yc)
	}, [mark, props.yc])
	useEffect(() => {
		mark.encode(MarkEncodingKey.height, props.height)
	}, [mark, props.height])
	useEffect(() => {
		mark.encode(MarkEncodingKey.opacity, props.opacity)
	}, [mark, props.opacity])
	useEffect(() => {
		mark.encode(MarkEncodingKey.fill, props.fill)
	}, [mark, props.fill])
	useEffect(() => {
		mark.encode(MarkEncodingKey.fillOpacity, props.fillOpacity)
	}, [mark, props.fillOpacity])
	useEffect(() => {
		mark.encode(MarkEncodingKey.stroke, props.stroke)
	}, [mark, props.stroke])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeOpacity, props.strokeOpacity)
	}, [mark, props.strokeOpacity])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeWidth, props.strokeWidth)
	}, [mark, props.strokeWidth])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeCap, props.strokeCap)
	}, [mark, props.strokeCap])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeDash, props.strokeDash)
	}, [mark, props.strokeDash])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeDashOffset, props.strokeDashOffset)
	}, [mark, props.strokeDashOffset])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeJoin, props.strokeJoin)
	}, [mark, props.strokeJoin])
	useEffect(() => {
		mark.encode(MarkEncodingKey.strokeMiterLimit, props.strokeMiterLimit)
	}, [mark, props.strokeMiterLimit])
	useEffect(() => {
		mark.encode(MarkEncodingKey.cursor, props.cursor)
	}, [mark, props.cursor])
	useEffect(() => {
		mark.encode(MarkEncodingKey.href, props.href)
	}, [mark, props.href])
	useEffect(() => {
		mark.encode(MarkEncodingKey.tooltip, props.tooltip)
	}, [mark, props.tooltip])
	useEffect(() => {
		mark.encode(MarkEncodingKey.zIndex, props.zIndex)
	}, [mark, props.zIndex])
	useEffect(() => {
		mark.encode(MarkEncodingKey.metadata, props.metadata)
	}, [mark, props.metadata])
	useEffect(() => {
		mark.encode(MarkEncodingKey.ariaTitle, props.ariaTitle)
	}, [mark, props.ariaTitle])
	useEffect(() => {
		mark.encode(MarkEncodingKey.ariaDescription, props.ariaDescription)
	}, [mark, props.ariaDescription])
	useEffect(() => {
		mark.encode(MarkEncodingKey.tabIndex, props.tabIndex)
	}, [mark, props.tabIndex])
}

function useMarkChannels(mark: MarkBuilder, props: CommonMarkProps) {
	useEffect(() => {
		mark.handle('onCopy', props.onCopy)
	}, [mark, props.onCopy])
	useEffect(() => {
		mark.handle('onCut', props.onCut)
	}, [mark, props.onCut])
	useEffect(() => {
		mark.handle('onPaste', props.onPaste)
	}, [mark, props.onPaste])
	useEffect(() => {
		mark.handle('onKeyDown', props.onKeyDown)
	}, [mark, props.onKeyDown])
	useEffect(() => {
		mark.handle('onKeyPress', props.onKeyPress)
	}, [mark, props.onKeyPress])
	useEffect(() => {
		mark.handle('onKeyUp', props.onKeyUp)
	}, [mark, props.onKeyUp])
	useEffect(() => {
		mark.handle('onFocus', props.onFocus)
	}, [mark, props.onFocus])
	useEffect(() => {
		mark.handle('onBlur', props.onBlur)
	}, [mark, props.onBlur])
	useEffect(() => {
		mark.handle('onClick', props.onClick)
	}, [mark, props.onClick])
	useEffect(() => {
		mark.handle('onContextMenu', props.onContextMenu)
	}, [mark, props.onContextMenu])
	useEffect(() => {
		mark.handle('onDoubleClick', props.onDoubleClick)
	}, [mark, props.onDoubleClick])
	useEffect(() => {
		mark.handle('onDrag', props.onDrag)
	}, [mark, props.onDrag])
	useEffect(() => {
		mark.handle('onDragEnd', props.onDragEnd)
	}, [mark, props.onDragEnd])
	useEffect(() => {
		mark.handle('onDragEnter', props.onDragEnter)
	}, [mark, props.onDragEnter])
	useEffect(() => {
		mark.handle('onDragExit', props.onDragExit)
	}, [mark, props.onDragExit])
	useEffect(() => {
		mark.handle('onDragLeave', props.onDragLeave)
	}, [mark, props.onDragLeave])
	useEffect(() => {
		mark.handle('onDragOver', props.onDragOver)
	}, [mark, props.onDragOver])
	useEffect(() => {
		mark.handle('onDragStart', props.onDragStart)
	}, [mark, props.onDragStart])
	useEffect(() => {
		mark.handle('onDrop', props.onDrop)
	}, [mark, props.onDrop])
	useEffect(() => {
		mark.handle('onMouseDown', props.onMouseDown)
	}, [mark, props.onMouseDown])
	useEffect(() => {
		mark.handle('onMouseEnter', props.onMouseEnter)
	}, [mark, props.onMouseEnter])
	useEffect(() => {
		mark.handle('onMouseLeave', props.onMouseLeave)
	}, [mark, props.onMouseLeave])
	useEffect(() => {
		mark.handle('onMouseMove', props.onMouseMove)
	}, [mark, props.onMouseMove])
	useEffect(() => {
		mark.handle('onMouseOut', props.onMouseOut)
	}, [mark, props.onMouseOut])
	useEffect(() => {
		mark.handle('onMouseOver', props.onMouseOver)
	}, [mark, props.onMouseOver])
	useEffect(() => {
		mark.handle('onMouseUp', props.onMouseUp)
	}, [mark, props.onMouseUp])
	useEffect(() => {
		mark.handle('onPointerDown', props.onPointerDown)
	}, [mark, props.onPointerDown])
	useEffect(() => {
		mark.handle('onPointerMove', props.onPointerMove)
	}, [mark, props.onPointerMove])
	useEffect(() => {
		mark.handle('onPointerUp', props.onPointerUp)
	}, [mark, props.onPointerUp])
	useEffect(() => {
		mark.handle('onPointerCancel', props.onPointerCancel)
	}, [mark, props.onPointerCancel])
	useEffect(() => {
		mark.handle('onGotPointerCapture', props.onGotPointerCapture)
	}, [mark, props.onGotPointerCapture])
	useEffect(() => {
		mark.handle('onLostPointerCapture', props.onLostPointerCapture)
	}, [mark, props.onLostPointerCapture])
	useEffect(() => {
		mark.handle('onPointerEnter', props.onPointerEnter)
	}, [mark, props.onPointerEnter])
	useEffect(() => {
		mark.handle('onPointerLeave', props.onPointerLeave)
	}, [mark, props.onPointerLeave])
	useEffect(() => {
		mark.handle('onPointerOver', props.onPointerOver)
	}, [mark, props.onPointerOver])
	useEffect(() => {
		mark.handle('onPointerOut', props.onPointerOut)
	}, [mark, props.onPointerOut])
	useEffect(() => {
		mark.handle('onSelect', props.onSelect)
	}, [mark, props.onSelect])
	useEffect(() => {
		mark.handle('onTouchCancel', props.onTouchCancel)
	}, [mark, props.onTouchCancel])
	useEffect(() => {
		mark.handle('onTouchEnd', props.onTouchEnd)
	}, [mark, props.onTouchEnd])
	useEffect(() => {
		mark.handle('onTouchMove', props.onTouchMove)
	}, [mark, props.onTouchMove])
	useEffect(() => {
		mark.handle('onTouchStart', props.onTouchStart)
	}, [mark, props.onTouchStart])
	useEffect(() => {
		mark.handle('onScroll', props.onScroll)
	}, [mark, props.onScroll])
	useEffect(() => {
		mark.handle('onWheel', props.onWheel)
	}, [mark, props.onWheel])
}
