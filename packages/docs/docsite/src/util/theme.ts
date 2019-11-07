/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import typography from '../configs/typography'

const { options: topts } = typography
export default {
	text: {
		fontFamily: '"Josefin Sans", sans-serif',
		lineHeight: topts.baseLineHeight as number,
		highlight: '#2D882D',
		fontColor: '#ebe77e',
	},
	header: {
		linkFontSize: 8,
		linkFontWeight: 100,
	},
	palette: {
		primary: { ...('#05070d' as any), rgb: [5, 7, 13] },
		highlight: '#89C4F8',
		alt: '#335C67',
		alt2: '#E09F3E',
		alt3: '#540B0E',
		grey: '#444',
		whitish: '#FEFEFE',
	},
	backgrounds: {
		sidebar: '#F6F6F6',
		header: '#05070d', // black
		background: '#05070d', // black
	},
}
