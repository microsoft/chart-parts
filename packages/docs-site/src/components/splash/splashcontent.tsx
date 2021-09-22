/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { withPrefix } from 'gatsby'
import { memo, useRef, useMemo } from 'react'
import styled from 'styled-components'
import theme from '../../util/theme'
import Footer from '../footer'
import * as HeaderComp from '../header/header'
import { usePaneMousehandlers } from './splash.hooks'

export interface SplashContentProps {
	animationComplete: boolean
}
export const SplashContent: React.FC<SplashContentProps> = memo(
	function SplashContent({ animationComplete }) {
		const docRef = useRef<HTMLDivElement>(null)
		const blogRef = useRef<HTMLDivElement>(null)
		const sourceRef = useRef<HTMLDivElement>(null)
		const opacity = useMemo(
			() => (animationComplete ? 1 : 0),
			[animationComplete]
		)

		const [blogMouseEnter, blogMouseLeave, onBlogClick] = usePaneMousehandlers(
			blogRef,
			animationComplete,
			withPrefix('/blog')
		)
		const [sourceMouseEnter, sourceMouseLeave, onSourceClick] =
			usePaneMousehandlers(
				sourceRef,
				animationComplete,
				'https://github.com/Microsoft/chart-parts'
			)
		const [docMouseEnter, docMouseLeave, onDocClick] = usePaneMousehandlers(
			docRef,
			animationComplete,
			withPrefix('/documentation')
		)
		return (
			<Container>
				<HeaderComp.Header opacity={0} showLinks={false} />
				<BoxRow style={{ opacity: 0 }} id="links">
					<Box
						id="blog"
						style={{ background: theme.logoPalette.blue }}
						ref={blogRef as any}
						onMouseEnter={blogMouseEnter}
						onMouseLeave={blogMouseLeave}
						onClick={onBlogClick}
					>
						<BlogLink>What&apos;s new?</BlogLink>
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
				<FooterRow style={{ opacity }}>
					<Footer />
				</FooterRow>
			</Container>
		)
	}
)

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`

const FooterRow = styled.div`
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
	flex: 1;
	display: flex;
	flex-direction: row;
`
/* display: grid;
	position: absolute;
	top: ${headerHeight}px;
	left: 0px;
	width: 100%;
	@media (min-width: ${minScreenSize}) {
		display: flex;
	} */

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
