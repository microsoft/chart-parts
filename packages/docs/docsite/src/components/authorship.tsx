import React, { memo } from 'react'

export interface AuthorshipProps {
	name: string
	twitter?: string
	github?: string
}
export const Authorship: React.FC<AuthorshipProps> = memo(
	({ name, twitter, github }) => {
		return (
			<sub>
				by: {name}&nbsp;
				{twitter ? (
					<>
						<a href={`https://twitter.com/${twitter}`}>Twitter</a>
						&nbsp;
					</>
				) : null}
				{github ? <a href={`https://github.com/${github}`}>GitHub</a> : null}
			</sub>
		)
	}
)
