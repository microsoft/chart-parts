/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import styled from 'styled-components'
import theme from '../util/theme'

const PrivacyStatement: React.FC = () => (
	<PrivacyText>
		This site does not collect any personal information or use cookies.&nbsp;
		<PrivacyLink
			target="_blank"
			href="https://privacy.microsoft.com/en-us/privacystatement/"
		>
			Read Microsoft's statement on Privacy and Cookies.
		</PrivacyLink>
	</PrivacyText>
)

const PrivacyText = styled.div`
	color: ${theme.palette.whitish};
	font-family: ${theme.text.fontFamily};
	font-size: 12px;
`

const PrivacyLink = styled.a`
	color: ${theme.palette.highlight};
	font-family: ${theme.text.fontFamily};
	font-size: 12px;
`

export default PrivacyStatement
