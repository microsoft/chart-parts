/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { TimelineMax, TweenLite, CSSPlugin, gsap } from 'gsap'
import { useEffect, useState, RefObject, useCallback } from 'react'
import { randomBetween } from '../../util/util'

gsap.registerPlugin(CSSPlugin)

const EMPTY_RECT = {
	width: 0,
	height: 0,
	left: 0,
	top: 0,
}

// get all chart part elements
function getChartPartsChars() {
	const chars = ['c', 'h', 'a', 'r', 't', 'p', 'a', 'r', 't', 's']
	return chars.reduce((acc: HTMLElement[], letter: string, index: number) => {
		const elem = document.getElementById(`char-${letter}${index + 1}`)
		if (elem) {
			acc.push(elem)
		}
		return acc
	}, [])
}

export function useSplashPageMountAnimation(
	container: HTMLDivElement | null,
	titleRef: RefObject<any>,
	height: number | undefined,
	width: number | undefined
): [boolean] {
	const [animatingOut, setAnimationOut] = useState<boolean>(false)
	const [charElements, setChars] = useState<HTMLElement[] | undefined>(
		undefined
	)

	const getChars = useCallback(() => {
		if (charElements === undefined) {
			const charElements = getChartPartsChars()
			setChars(charElements)
			return charElements
		}
		return charElements
	}, [charElements])

	const startAnimation = useCallback(() => {
		if (
			animatingOut ||
			typeof window === undefined ||
			width === undefined ||
			height === undefined
		) {
			return
		}

		const animate = () => {
			if (titleRef && titleRef.current) {
				const title = titleRef.current as any
				const bg = document.getElementsByClassName('background')
				const chars = getChars()
				const tl = new TimelineMax()
				tl.add('First')
				tl.add('PieceTogether')
				tl.add('Scale')

				// make logo and background visible
				tl.to(title, 0.01, { opacity: 1 }, 'First')

				for (let i = 0; i < chars.length; i++) {
					tl.from(
						chars[i],
						1.0,
						{
							z: randomBetween(-1500, 4500),
							x:
								i % 2 === 0
									? randomBetween(-80, -600)
									: randomBetween(280, width / 2),
							y: randomBetween(-400, 1000),
							opacity: 0,
							rotation: randomBetween(-360, 60),
							rotationX: randomBetween(-200, 200),
							rotationY: randomBetween(-60, 60),
							ease: 'elastic.out(1, 0.4)',
							delay: 0.1,
						},
						'PieceTogether+=' + Math.random() * 0.3
					)
				}

				// handle animation of background objects
				for (let i = 0; i < bg.length; i++) {
					const group = bg[i]
					const children: HTMLCollection = group.children
					for (let cIndex = 0; cIndex < children.length; cIndex++) {
						const child = children[cIndex]
						tl.from(
							child,
							0.8,
							{
								z: randomBetween(-1500, 2500),
								x:
									i % 2 === 0
										? randomBetween(-80, -width)
										: randomBetween(280, width / 2),
								y: randomBetween(-height, height),
								rotation: randomBetween(360, 720),
								rotationX: randomBetween(-160, 160),
								rotationY: randomBetween(-160, 160),
								opacity: 0,
								ease: 'elastic.out(1, 0.4)',
							},
							'PieceTogether+=' + Math.random() * 0.3
						)
					}
				}

				tl.to(
					'.background',
					0.3,
					{
						opacity: 0,
						ease: 'elastic.in(1, 0.3)',
						delay: 0.7,
					},
					'Scale+=' + 0.1
				)

				setTimeout(() => {
					const svgElem = document.getElementById('svg-logo2')
					if (!svgElem) {
						return
					}
					const cdims2 = svgElem.getBoundingClientRect()
					const letterGroupElement = document.getElementById(
						'chart-parts-letter-group'
					)
					const offset =
						letterGroupElement?.getBoundingClientRect() || EMPTY_RECT
					const callbackFunc = () => {
						setAnimationOut(true)
					}
					const timeLineOut = new TimelineMax({
						onComplete: callbackFunc,
						delay: 0.1,
					})
					timeLineOut.addLabel('Scale', 0.4)
					timeLineOut.addLabel('Links', 0.4)
					timeLineOut.to(
						svgElem,
						0.4,
						{
							x: -(
								cdims2.left +
								(offset.left - cdims2.left) +
								(cdims2.left + (offset.left - cdims2.left)) * 1.8
							),
							y: -(
								cdims2.top +
								(offset.top - cdims2.top) +
								offset.height / 2 +
								10
							),
							scale: 0.2,
						},
						'Scale'
					)
					timeLineOut.to(
						title,
						0.4,
						{
							opacity: 0,
							delay: 0.35,
						},
						'Scale'
					)
					timeLineOut.to(
						'.header',
						0.1,
						{
							opacity: 1,
							delay: 0.35,
						},
						'Scale'
					)
					// stagger in fade links right to left
					const links = ['links', 'source', 'docs', 'blog']
					links.forEach((item: string, index: number) => {
						timeLineOut.to(
							`#${item}`,
							0.2,
							{
								opacity: 1,
								delay: 0.4 + index * 0.1,
							},
							'Links+=' + 0
						)
					})

					timeLineOut.play()
				}, 1200)
			}
		}
		animate()
	}, [animatingOut, getChars, height, titleRef, width])

	useEffect(() => {
		if (container) {
			startAnimation()
		}
	}, [startAnimation, container, height, width])
	return [animatingOut]
}

export function usePaneMousehandlers(
	ref: RefObject<any>,
	animationComplete: boolean,
	resourceLocation: string
) {
	// highlight div on mouseover
	const mouseEnter = useCallback(() => {
		if (ref && ref.current && animationComplete) {
			TweenLite.to(ref.current, 0.5, {
				ease: 'sine.out',
				opacity: 1.0,
			})
		}
	}, [ref, animationComplete])

	// return div to prev opacity
	const mouseLeave = useCallback(() => {
		if (ref && ref.current && animationComplete) {
			TweenLite.to(ref.current, 0.5, {
				ease: 'sine.out',
				opacity: 0.8,
			})
		}
	}, [ref, animationComplete])

	const onClick = useCallback(() => {
		if (window) {
			window.location.href = resourceLocation
		}
	}, [resourceLocation])

	return [mouseEnter, mouseLeave, onClick]
}
