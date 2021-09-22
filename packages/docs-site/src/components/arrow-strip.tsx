/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useState, useEffect, memo, useMemo } from 'react'
import { FaChevronDown as ArrowIcon } from 'react-icons/fa'
import styled from 'styled-components'

const UPDATE_FREQUENCY = 100

export interface ArrowStripProps {
	fadePercent: number
	style?: React.CSSProperties
	className?: string
}
export const ArrowStrip: React.FC<ArrowStripProps> = memo(function ArrowStrip({
	fadePercent,
	style: inputStyle,
	className,
}) {
	const opacity = useRotatingOpacity()
	const style = useMemo(
		() => ({ ...inputStyle, opacity: 1.0 - fadePercent }),
		[fadePercent, inputStyle]
	)
	return (
		<ArrowStripContainer className={className} style={style}>
			<ArrowIcon color="white" opacity={(opacity + 0.9) % 1.0} />
			<ArrowIcon color="white" opacity={(opacity + 0.7) % 1.0} />
			<ArrowIcon color="white" opacity={(opacity + 0.5) % 1.0} />
			<ArrowIcon color="white" opacity={(opacity + 0.3) % 1.0} />
			<ArrowIcon color="white" opacity={(opacity + 0.1) % 1.0} />
		</ArrowStripContainer>
	)
})

const ArrowStripContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: sticky;
	bottom: 0;
	justify-self: flex-end;
`

function useRotatingOpacity() {
	const [opacity, setOpacity] = useState(0)
	useEffect(() => {
		let innerOpacity = 0
		const handle = setInterval(() => {
			innerOpacity = (innerOpacity + 0.1) % 1.0
			setOpacity(innerOpacity)
		}, UPDATE_FREQUENCY)
		return () => clearInterval(handle)
	}, [setOpacity])
	return opacity
}
