/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { useRef, RefObject, memo } from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../util/hooks/useWindowDimensions'
import LogoBG from './logobg'
import { useSplashPageMountAnimation } from './splash.hooks'
import { SplashContent } from './SplashContent'

const IndexPage: React.FC = memo(() => {
	const titleRef = useRef<RefObject<any> | null | undefined>(null)
	const { height, width } = useWindowDimensions()
	const [animatingout] = useSplashPageMountAnimation(titleRef, height, width)

	return (
		<>
			<TitleContainer
				style={{ height: height || 768 }}
				className="title"
				ref={titleRef as any}
			>
				<LogoBG height={height || 1024} width={width || 768} />
			</TitleContainer>
			<SplashContent animationComplete={animatingout} />
		</>
	)
})

const TitleContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
`

IndexPage.displayName = 'Splash'
export default IndexPage
