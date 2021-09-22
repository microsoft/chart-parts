/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useRef, RefObject, memo, useState } from 'react'
import useDimensions from 'react-use-dimensions'
import styled from 'styled-components'
import LogoBG from './logobg'
import { useSplashPageMountAnimation } from './splash.hooks'
import { SplashContent } from './splashcontent'
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-ignore

const IndexPage: React.FC = memo(function IndexPage() {
	const [containerElement, setContainerElement] =
		useState<HTMLDivElement | null>(null)
	const titleRef = useRef<RefObject<any> | null | undefined>(null)
	const [containerRef, { height, width }] = useDimensions()
	const [animationComplete] = useSplashPageMountAnimation(
		containerElement,
		titleRef,
		height,
		width
	)

	return (
		<Container
			ref={(node) => {
				containerRef(node)
				setContainerElement(node)
			}}
		>
			{animationComplete ? null : (
				<TitleContainer
					style={{ height: height || 768 }}
					className="title"
					ref={titleRef as any}
				>
					<LogoBG height={height || 1024} width={width || 768} />
				</TitleContainer>
			)}
			<SplashContent animationComplete={animationComplete} />
		</Container>
	)
})

const Container = styled.div`
	display: flex;
	flex: 1;
`
const TitleContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
`

export default IndexPage
