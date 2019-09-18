/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useMemo } from 'react'
import { GoMarkGithub as GitHubIcon } from 'react-icons/go'
import { FaTwitter as TwitterIcon } from 'react-icons/fa'
import styled from 'styled-components'

export interface AuthorshipProps {
	name: string
	twitter?: string
	github?: string
}
export const Authorship: React.FC<AuthorshipProps> = memo(
	({ name, twitter, github }) => {
		const twitterUrl = useMemo(
			() => twitter && `https://twitter.com/${twitter}`,
			[twitter]
		)
		const githubUrl = useMemo(() => github && `https://github.com/${github}`, [
			github,
		])
		return (
			<span>
				<By>by </By>
				<Name>{name}</Name>&nbsp;
				{twitter ? (
					<>
						<a href={twitterUrl}>
							<TwitterIcon size={12} />
						</a>
						&nbsp;
					</>
				) : null}
				{github ? (
					<a href={githubUrl}>
						<GitHubIcon size={12} />
					</a>
				) : null}
			</span>
		)
	}
)
Authorship.displayName = 'Authorship'

const By = styled.span`
	font-size: 10px;
	font-weight: 100;
`
const Name = styled.span`
	font-size: 12px;
	font-weight: 300;
`
