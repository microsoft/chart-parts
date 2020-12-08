/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import styled from 'styled-components'
import theme from '../util/theme'
import PrivacyStatement from './privacy-statement'

export interface FooterProps {
	style?: React.CSSProperties
}

export const FOOTER_HEIGHT = 50
const Footer: React.FC<FooterProps> = style => (
	<Container style={style as any}>
		<FooterColumn>
			<WithLove>with ♥ from Microsoft</WithLove>
		</FooterColumn>
		<FooterColumn>
			<WithLove>
				<PrivacyStatement />
			</WithLove>
		</FooterColumn>
	</Container>
)

const Container = styled.div`
	display: flex;
`

const FooterColumn = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: ${FOOTER_HEIGHT}px;
`

const WithLove = styled.div`
	color: ${theme.palette.whitish};
	font-family: ${theme.text.fontFamily};
	font-size: 12px;
	margin-top: ${FOOTER_HEIGHT / 2}px;
`

export default Footer
