/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { useRef, RefObject, useMemo, memo } from 'react'
import styled from 'styled-components'
import Footer, { FOOTER_HEIGHT } from '../footer'
import * as HeaderComp from '../header/header'
import { useWindowDimensions } from '../../util/hooks/useWindowDimensions'
import LogoBG from './logobg'
import {
	useSplashPageMountAnimation,
	usePaneMousehandlers,
} from './splash.hooks'
import theme from '../../util/theme'

const HeaderComponent = HeaderComp.Header
const headerHeight = HeaderComp.HEIGHT

// use different layout for click divs based on screen size
const minScreenSize = '768px'

const IndexPage: React.FC = memo(() => {
	const titleRef = useRef<RefObject<any> | null | undefined>(null)
	const docRef = useRef<RefObject<any> | null | undefined>(null)
	const blogRef = useRef<RefObject<any> | null | undefined>(null)
	const sourceRef = useRef<RefObject<any> | null | undefined>(null)

	const { height, width } = useWindowDimensions()
	const [animatingout] = useSplashPageMountAnimation(titleRef, height, width)
	const [blogMouseEnter, blogMouseLeave, onBlogClick] = usePaneMousehandlers(
		blogRef,
		animatingout,
		'/blog'
	)
	const [
		sourceMouseEnter,
		sourceMouseLeave,
		onSourceClick,
	] = usePaneMousehandlers(
		sourceRef,
		animatingout,
		'https://github.com/Microsoft/chart-parts'
	)
	const [docMouseEnter, docMouseLeave, onDocClick] = usePaneMousehandlers(
		docRef,
		animatingout,
		'/documentation'
	)

	const boxRowHeight = useMemo(
		() => `${height - (headerHeight + FOOTER_HEIGHT + 10)}px`,
		[height]
	)

	const variableOpacity = useMemo(() => (animatingout ? 1 : 0), [animatingout])

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
						style={{ background: theme.logoPalette.blue }}
						ref={blogRef as any}
						onMouseEnter={blogMouseEnter}
						onMouseLeave={blogMouseLeave}
						onClick={onBlogClick}
					>
						<BlogLink>What's new?</BlogLink>
					</Box>
					<Box
						id="docs"
						style={{ background: theme.logoPalette.green }}
						onMouseEnter={docMouseEnter}
						onMouseLeave={docMouseLeave}
						onClick={onDocClick}
					>
						<DocsLink>Read the docs</DocsLink>
					</Box>
					<Box
						id="source"
						style={{ background: theme.logoPalette.pink }}
						ref={sourceRef as any}
						onMouseEnter={sourceMouseEnter}
						onMouseLeave={sourceMouseLeave}
						onClick={onSourceClick}
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
})

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
