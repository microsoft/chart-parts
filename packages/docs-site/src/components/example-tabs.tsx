/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useMemo, FC, CSSProperties } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'
import 'react-tabs/style/react-tabs.css'
import chartIndex from './charts'

export interface ExampleTabsProps {
	name: string
	component: string
}

const frameStyle: CSSProperties = {
	width: '100%',
	height: 800,
	border: 0,
	borderRadius: 4,
	overflow: 'hidden',
}

const exampleUrl = (name: string) =>
	`https://codesandbox.io/embed/github/microsoft/chart-parts/tree/gh-pages/examples/${name}?fontsize=14`

export const ExampleTabs: FC<ExampleTabsProps> = memo(function ExampleTabs({
	name,
	component,
}) {
	const ExampleComponent = useMemo(
		() => (chartIndex as any)[component],
		[component]
	)
	const url = useMemo(() => exampleUrl(name), [name])

	return (
		<Tabs>
			<TabList>
				<Tab>Example</Tab>
				<Tab>View Code</Tab>
			</TabList>
			<TabPanel>
				<Container>
					<ExampleComponent />
				</Container>
			</TabPanel>
			<TabPanel>
				<iframe
					src={url}
					style={frameStyle}
					title="View Code"
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
		</Tabs>
	)
})

const Container = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`
