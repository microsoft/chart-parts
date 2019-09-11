/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import styled from 'styled-components'
import renderAst from '../util/renderHtmlAst'

export interface DocProps {
	docPage: {
		htmlAst: any
	}
}

const Doc: React.FC<DocProps> = ({ docPage }) => {
	return (
		<Container>
			<Gutter />
			<Content>{renderAst(docPage.htmlAst)}</Content>
			<Gutter />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
`

const Gutter = styled.div`
	flex: 1;
`

const Content = styled.div`
	flex: 5;
	display: flex;
	flex-direction: column;
`

export default Doc
