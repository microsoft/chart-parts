/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import theme from '../util/theme'

interface BelowTheFoldProps {
	style?: React.CSSProperties
}

const BelowTheFold: React.FC<BelowTheFoldProps> = ({ style }) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						githubUrl
					}
				}
			}
		`}
		render={data => {
			const {
				site: {
					siteMetadata: { githubUrl },
				},
			} = data
			return (
				<BoxRow style={style}>
					<Box style={{ backgroundColor: theme.palette.alt }}>
						<DocsLink to="/documentation">Read the docs</DocsLink>
					</Box>
					<Box style={{ backgroundColor: theme.palette.alt2 }}>
						<BlogLink to="/blog">What's new?</BlogLink>
					</Box>
					<Box style={{ backgroundColor: theme.palette.alt3 }}>
						<StyledAnchor target="_blank" href={githubUrl}>
							Browse the source
						</StyledAnchor>
					</Box>
				</BoxRow>
			)
		}}
	/>
)

const BoxRow = styled.div`
	display: flex;
	height: 400px;
`

const Box = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const StyledLink = styled(Link)`
	font-family: ${theme.text.fontFamily};
	font-weight: bold;
	font-size: 16px;
`

const DocsLink = styled(StyledLink)`
	color: #fffffd;
`

const BlogLink = styled(StyledLink)`
	color: #0b1e17;
`

const StyledAnchor = styled.a`
	font-family: ${theme.text.fontFamily};
	font-weight: bold;
	font-size: 16px;
	color: ${theme.palette.highlight};
`
export default BelowTheFold
