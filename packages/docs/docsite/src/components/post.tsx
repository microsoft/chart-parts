/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import renderAst from '../util/renderHtmlAst'
import styled from 'styled-components'
export interface PostProps {
	post: {
		html: string
		htmlAst: any
		frontmatter: {
			date: string
		}
	}
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<Container>
			<Gutter />
			<Content>
				<h6>{post.frontmatter.date}</h6>
				{renderAst(post.htmlAst)}
			</Content>
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

export default Post
