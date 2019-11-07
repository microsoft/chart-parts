import React, {
	useEffect,
	useState,
	useRef,
	RefObject,
	useMemo,
	useCallback,
} from 'react'
import anime from 'animejs'
import { randomBetween } from '../../util/util'
import styled from 'styled-components'
import Footer, { FOOTER_HEIGHT } from '../footer'
import * as HeaderComp from '../header/header'
import { useWindowDimensions } from '../../util/hooks/useWindowDimensions'
import LogoBG from './logobg'
import { TimelineMax, Elastic } from 'gsap'

const HeaderComponent = HeaderComp.Header
const headerHeight = HeaderComp.HEIGHT

// use different layout for click divs based on screen size
const minScreenSize = '768px'

const IndexPage = () => {
	const [animatingOut, setAnimationOut] = useState<boolean>(false)
	const titleRef = useRef<RefObject<any> | null | undefined>(null)
	const docRef = useRef<RefObject<any> | null | undefined>(null)
	const blogRef = useRef<RefObject<any> | null | undefined>(null)
	const sourceRef = useRef<RefObject<any> | null | undefined>(null)

	const { height, width } = useWindowDimensions()

	useEffect(() => {
		startAnimation()
	}, [])

	const startAnimation = () => {
		if (animatingOut || typeof window === 'undefined') {
			return
		}

		const animate = () => {
			if (titleRef && titleRef.current) {
				const title = titleRef.current as any
				const bg = document.getElementsByClassName('background')!
				const chars = getChartPartsChars()
				const tl = new TimelineMax()
				tl.add('First')
				tl.add('PieceTogether')
				tl.add('Scale')

				// make logo and background visible
				tl.to(title, 0.01, { opacity: 1 }, 'First')

				for (let i = 0; i < chars.length; i++) {
					tl.from(
						chars[i],
						0.8,
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
							ease: Elastic,
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
								ease: Elastic,
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
						easing: Elastic,
						delay: 0.2,
					},
					'Scale' + 0
				)

				setTimeout(() => {
					const svgElem = document.getElementById('svg-logo2')!
					const cdims2 = svgElem.getBoundingClientRect()
					const offset = document
						.getElementById('chart-parts-letter-group')!
						.getBoundingClientRect()
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
				}, 1000)
			}
		}
		animate()
	}

	// get all chart part elements
	const getChartPartsChars = () => {
		const chars = ['c', 'h', 'a', 'r', 't', 'p', 'a', 'r', 't', 's']
		return chars.reduce((acc: HTMLElement[], letter: string, index: number) => {
			const elem = document.getElementById(`char-${letter}${index + 1}`)!
			acc.push(elem)
			return acc
		}, [])
	}

	// highlight div on mouseover
	const mouseEnter = useCallback(
		(event: React.MouseEvent<any>, ref: any) => {
			if (ref && ref.current && setAnimationOut) {
				anime({
					targets: ref.current,
					easing: 'easeOutExpo',
					opacity: [0.8, 1],
					duration: 500,
				})
			}
		},
		[setAnimationOut]
	)

	// return div to prev opacity
	const mouseLeave = useCallback(
		(event: React.MouseEvent<any>, ref: any) => {
			if (ref && ref.current && setAnimationOut) {
				anime({
					targets: ref.current,
					easing: 'easeOutExpo',
					opacity: [1, 0.8],
					duration: 500,
				})
			}
		},
		[setAnimationOut]
	)

	const boxRowHeight = useMemo(() => {
		return `${height - (headerHeight + FOOTER_HEIGHT + 10)}px`
	}, [height])

	const variableOpacity = useMemo(() => {
		return animatingOut ? 1 : 0
	}, [animatingOut])

	return (
		<div>
			<div>
				<TitleContainer
					style={{ height }}
					className="title"
					ref={titleRef as any}
				>
					<LogoBG height={height} width={width} />
				</TitleContainer>
				<HeaderComponent opacity={0} showLinks={false} />
				<BoxRow style={{ opacity: 0, height: boxRowHeight, width }} id="links">
					<Box
						id="blog"
						style={{
							background: '#89C4F8',
						}}
						ref={blogRef as any}
						onMouseEnter={(ev: React.MouseEvent<any>) =>
							mouseEnter(ev, blogRef)
						}
						onMouseLeave={(ev: React.MouseEvent<any>) =>
							mouseLeave(ev, blogRef)
						}
						onClick={() => (location.href = '/blog')}
					>
						<BlogLink>What's new?</BlogLink>
					</Box>
					<Box
						id="docs"
						style={{ background: '#a6f889' }}
						onMouseEnter={(ev: React.MouseEvent<any>) => mouseEnter(ev, docRef)}
						onMouseLeave={(ev: React.MouseEvent<any>) => mouseLeave(ev, docRef)}
						onClick={() => (location.href = '/documentation')}
						ref={docRef as any}
					>
						<DocsLink>Read the docs</DocsLink>
					</Box>
					<Box
						id="source"
						style={{ background: '#f787a6' }}
						ref={sourceRef as any}
						onMouseEnter={(ev: React.MouseEvent<any>) =>
							mouseEnter(ev, sourceRef)
						}
						onMouseLeave={(ev: React.MouseEvent<any>) =>
							mouseLeave(ev, sourceRef)
						}
						onClick={() =>
							(location.href = 'https://github.com/Microsoft/chart-parts')
						}
					>
						<StyledAnchor>Browse the source</StyledAnchor>
					</Box>
				</BoxRow>
			</div>
			<FooterRow style={{ opacity: variableOpacity }}>
				<Footer />
			</FooterRow>
		</div>
	)
}

const TitleContainer = styled.div`
	position: relative;
	opacity: 0;
`

const FooterRow = styled.div`
	position: absolute;
	bottom: 10px;
	width: 100%;
`

const Box = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	opacity: 0;
`

const BoxRow = styled.div`
	display: grid;
	position: absolute;
	top: ${headerHeight}px;
	left: 0px;
	width: 100%;
	@media (min-width: ${minScreenSize}) {
		display: flex;
	}
`

const DocsLink = styled.h1`
	color: black;
	font-family: 'Josefin Sans', -apple-system, system-ui, BlinkMacSystemFont,
		'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
	border-bottom: 0px;
`

const BlogLink = styled.h1`
	color: black;
	font-family: 'Josefin Sans', -apple-system, system-ui, BlinkMacSystemFont,
		'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
	border-bottom: 0px;
`

const StyledAnchor = styled.h1`
	font-weight: bold;
	color: black;
	font-family: 'Josefin Sans', -apple-system, system-ui, BlinkMacSystemFont,
		'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
	border-bottom: 0px;
`
export default IndexPage
