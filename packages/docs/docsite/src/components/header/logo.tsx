/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo } from 'react'
import theme from '../../util/theme'
interface LogoProps {
	height: number
}

// logo used for header component
const Logo: React.FC<LogoProps> = memo(function Logo({ height }) {
	return (
		<svg
			version="1.1"
			height={`${height}`}
			viewBox="0 0 832.89957 205.18784"
			id="svg-logo"
		>
			<g transform="translate(414.19 -42.183)" id="logo-group">
				<g transform="translate(-236.46 79.375)" id="char-c-1">
					<path
						className="char-c-1"
						d="m-42.145 27.329a48.318 49.196 1.4538 0 0 -67.821 5.5295l36.61 32.055zm-31.212 37.584-31.458 37.361a48.318 49.196 1.4538 0 0 67.86 -5.0439zm-31.458 37.361a48.318 49.196 1.4538 0 1 -0.073 -0.0601 48.318 49.196 1.4538 0 0 0.0684 0.0657zm-0.073-0.0601a48.318 49.196 1.4538 0 1 -1.7792 -1.7188 48.318 49.196 1.4538 0 0 1.6601 1.6202 48.318 49.196 1.4538 0 0 0.12026 0.0972zm-1.7792-1.7188a48.318 49.196 1.4538 0 1 -1.7381 -1.6942 48.318 49.196 1.4538 0 0 1.7381 1.6942zm-1.7381-1.6942a48.318 49.196 1.4538 0 1 -1.5874 -1.8728 48.318 49.196 1.4538 0 0 1.5874 1.8728zm-1.5874-1.8728a48.318 49.196 1.4538 0 1 -1.5526 -1.8491 48.318 49.196 1.4538 0 0 1.5526 1.8491zm-1.5526-1.8491a48.318 49.196 1.4538 0 1 -1.4916 -2.1635 48.318 49.196 1.4538 0 0 1.4916 2.1635zm-1.4916-2.1635a48.318 49.196 1.4538 0 1 -1.268 -1.86 48.318 49.196 1.4538 0 0 1.268 1.86zm-1.268-1.86a48.318 49.196 1.4538 0 1 -1.3068 -2.3654 48.318 49.196 1.4538 0 0 1.3068 2.3654zm-1.3068-2.3654a48.318 49.196 1.4538 0 1 -1.0482 -1.9236 48.318 49.196 1.4538 0 0 1.0482 1.9236zm-1.0482-1.9236a48.318 49.196 1.4538 0 1 -1.0318 -2.4068 48.318 49.196 1.4538 0 0 1.0318 2.4068zm-1.0318-2.4068a48.318 49.196 1.4538 0 1 -0.89327 -2.113 48.318 49.196 1.4538 0 0 0.89327 2.113zm-0.89327-2.113a48.318 49.196 1.4538 0 1 -0.76801 -2.4213 48.318 49.196 1.4538 0 0 0.76801 2.4213zm-0.76801-2.4213a48.318 49.196 1.4538 0 1 -0.70194 -2.2579 48.318 49.196 1.4538 0 0 0.70194 2.2579zm-0.70194-2.2579a48.318 49.196 1.4538 0 1 -0.52124 -2.4633 48.318 49.196 1.4538 0 0 0.52124 2.4633zm-0.52124-2.4633a48.318 49.196 1.4538 0 1 -0.48296 -2.3489 48.318 49.196 1.4538 0 0 0.48296 2.3489zm-0.48296-2.3489a48.318 49.196 1.4538 0 1 -0.2563 -2.3256 48.318 49.196 1.4538 0 0 0.2563 2.3256zm-0.2563-2.3256a48.318 49.196 1.4538 0 1 -0.27186 -2.5811 48.318 49.196 1.4538 0 0 0.27186 2.5811zm-0.27186-2.5811a48.318 49.196 1.4538 0 1 -0.0254 -2.2622 48.318 49.196 1.4538 0 0 0.0254 2.2622zm-0.0254-2.2622a48.318 49.196 1.4538 0 1 -0.017 -2.6355 48.318 49.196 1.4538 0 0 0.017 2.6355zm-0.017-2.6355a48.318 49.196 1.4538 0 1 0.21592 -2.4824 48.318 49.196 1.4538 0 0 -0.21592 2.4824zm0.21592-2.4824a48.318 49.196 1.4538 0 1 0.22168 -2.4137 48.318 49.196 1.4538 0 0 -0.22168 2.4137zm0.22168-2.4137a48.318 49.196 1.4538 0 1 0.45648 -2.442 48.318 49.196 1.4538 0 0 -0.45648 2.442zm0.45648-2.442a48.318 49.196 1.4538 0 1 0.45984 -2.3901 48.318 49.196 1.4538 0 0 -0.45984 2.3901zm0.45984-2.3901a48.318 49.196 1.4538 0 1 0.67583 -2.3205 48.318 49.196 1.4538 0 0 -0.67583 2.3205zm0.67583-2.3205a48.318 49.196 1.4538 0 1 0.71046 -2.3946 48.318 49.196 1.4538 0 0 -0.71046 2.3946zm0.71046-2.3946a48.318 49.196 1.4538 0 1 0.88669 -2.2064 48.318 49.196 1.4538 0 0 -0.88669 2.2064zm0.88669-2.2064a48.318 49.196 1.4538 0 1 0.95337 -2.34 48.318 49.196 1.4538 0 0 -0.95337 2.34zm0.95337-2.34a48.318 49.196 1.4538 0 1 1.1017 -2.1108 48.318 49.196 1.4538 0 0 -1.1017 2.1108zm1.1017-2.1108a48.318 49.196 1.4538 0 1 1.1746 -2.2264 48.318 49.196 1.4538 0 0 -1.1746 2.2264zm1.1746-2.2264a48.318 49.196 1.4538 0 1 1.3831 -2.1122 48.318 49.196 1.4538 0 0 -1.3831 2.1122zm1.3831-2.1122a48.318 49.196 1.4538 0 1 1.3137 -1.9835 48.318 49.196 1.4538 0 0 -1.3137 1.9835zm1.3137-1.9835a48.318 49.196 1.4538 0 1 1.1445 -1.4676 48.318 49.196 1.4538 0 0 -1.1445 1.4676zm1.1445-1.4676a48.318 49.196 1.4538 0 1 0.852 -1.0784 48.318 49.196 1.4538 0 0 -0.0561 0.0601 48.318 49.196 1.4538 0 0 -0.79587 1.0183zm0.852-1.0784a48.318 49.196 1.4538 0 1 0.11431 -0.12298l-0.0101-9e-3a48.318 49.196 1.4538 0 0 -0.10359 0.13209z"
						fill={theme.logoPalette.green}
					/>
					<path
						className="char-c-1"
						d="m-73.356 64.913-36.609-32.056a48.318 49.196 1.4538 0 0 -0.11456 0.12296 48.318 49.196 1.4538 0 0 -0.85196 1.0784 48.318 49.196 1.4538 0 0 -1.1445 1.4675 48.318 49.196 1.4538 0 0 -1.3021 1.9646 48.318 49.196 1.4538 0 0 -1.3971 2.1339 48.318 49.196 1.4538 0 0 -1.1745 2.2265 48.318 49.196 1.4538 0 0 -1.0971 2.1025 48.318 49.196 1.4538 0 0 -0.97763 2.3991 48.318 49.196 1.4538 0 0 -0.86478 2.1527 48.318 49.196 1.4538 0 0 -0.71045 2.3945 48.318 49.196 1.4538 0 0 -0.67582 2.3205 48.318 49.196 1.4538 0 0 -0.45998 2.3901 48.318 49.196 1.4538 0 0 -0.45644 2.442 48.318 49.196 1.4538 0 0 -0.22169 2.4138 48.318 49.196 1.4538 0 0 -0.21589 2.4824 48.318 49.196 1.4538 0 0 0.0158 2.4832 48.318 49.196 1.4538 0 0 0.0275 2.4276 48.318 49.196 1.4538 0 0 0.27054 2.58 48.318 49.196 1.4538 0 0 0.2546 2.3023 48.318 49.196 1.4538 0 0 0.51164 2.4913 48.318 49.196 1.4538 0 0 0.49165 2.3274 48.318 49.196 1.4538 0 0 0.72147 2.3191 48.318 49.196 1.4538 0 0 0.74888 2.3653 48.318 49.196 1.4538 0 0 0.95835 2.2634 48.318 49.196 1.4538 0 0 0.96061 2.2411 48.318 49.196 1.4538 0 0 1.2158 2.2284 48.318 49.196 1.4538 0 0 1.1354 2.0595 48.318 49.196 1.4538 0 0 1.387 2.0341 48.318 49.196 1.4538 0 0 1.3851 2.0056 48.318 49.196 1.4538 0 0 1.5403 1.8357 48.318 49.196 1.4538 0 0 1.5986 1.8876 48.318 49.196 1.4538 0 0 1.8777 1.8303 48.318 49.196 1.4538 0 0 1.623 1.5655 48.318 49.196 1.4538 0 0 0.0908 0.0761z"
						fill={theme.logoPalette.blue}
					/>
				</g>
				<g transform="translate(-236.46 79.375)" id="char-h-2">
					<rect
						className="char-h-2"
						x="-3.4229"
						y="31.453"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.blue}
					/>
					<rect
						className="char-h-2"
						x="-34.975"
						y="31.453"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<rect
						className="char-h-2"
						x="-34.995"
						y="69.164"
						width="61.56"
						height="16.131"
						fill={theme.logoPalette.green}
					/>
				</g>
				<g transform="translate(-236.46 79.375)" id="char-r-4">
					<rect
						className="char-r-4"
						x="114.97"
						y="31.453"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<path
						className="char-r-4"
						transform="matrix(.0058489 .99998 .99998 -.0060008 0 0)"
						d="m80.373 144.54a24.026 23.555 0 0 1 -23.944 23.555 24.026 23.555 0 0 1 -24.107 -23.394l24.025-0.16079z"
						fill={theme.logoPalette.green}
					/>
					<path
						className="char-r-4"
						d="m115.33 55.467-0.36056 58.636h58.987z"
						fill={theme.logoPalette.blue}
					/>
				</g>
				<g transform="translate(-236.46 79.375)" id="char-a-3">
					<path
						className="char-a-3"
						d="m70.395 29.057-21.398 42.441 42.867 0.0818z"
						fill={theme.logoPalette.blue}
					/>
					<path
						className="char-a-3"
						d="m48.997 71.499-21.398 42.441 42.867 0.0818z"
						fill={theme.logoPalette.pink}
					/>
					<path
						className="char-a-3"
						d="m91.865 71.58-21.398 42.441 42.867 0.0818z"
						fill={theme.logoPalette.orange}
					/>
				</g>
				<g transform="translate(-236.46 79.375)" id="char-t-5">
					<rect
						className="char-t-5"
						x="187.43"
						y="32.429"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<rect
						className="char-t-5"
						x="172.66"
						y="29.518"
						width="58.117"
						height="16.131"
						fill={theme.logoPalette.blue}
					/>
				</g>
				<g transform="translate(57.452 -39.409)" id="char-a-7">
					<path
						className="char-a-7"
						d="m69.332 148.06-21.398 42.441 42.867 0.0818z"
						fill={theme.logoPalette.blue}
					/>
					<path
						className="char-a-7"
						d="m47.934 190.5-21.398 42.441 42.867 0.0818z"
						fill={theme.logoPalette.pink}
					/>
					<path
						className="char-a-7"
						d="m90.801 190.58-21.398 42.441 42.867 0.0818z"
						fill="#fab289"
					/>
				</g>
				<g transform="translate(57.452 -39.409)" id="char-r-8">
					<rect
						className="char-r-8"
						x="113.34"
						y="150.45"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<path
						className="char-r-8"
						transform="matrix(.0058489 .99998 .99998 -.0060008 0 0)"
						d="m199.36 142.21a24.026 23.555 0 0 1 -23.944 23.555 24.026 23.555 0 0 1 -24.107 -23.394l24.025-0.16078z"
						fill={theme.logoPalette.green}
					/>
					<path
						className="char-r-8"
						d="m113.7 174.47-0.36056 58.636h58.987z"
						fill={theme.logoPalette.blue}
					/>
				</g>
				<g transform="translate(57.452 -39.409)" id="char-p-6c">
					<rect
						className="char-p-6"
						x="-26.538"
						y="150.45"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<path
						className="char-p-6"
						transform="matrix(.0058489 .99998 .99998 -.0060008 0 0)"
						d="m198.52 2.3358a24.026 23.555 0 0 1 -23.944 23.555 24.026 23.555 0 0 1 -24.107 -23.394l24.025-0.16078z"
						fill={theme.logoPalette.green}
					/>
				</g>
				<g transform="translate(57.452 -39.409)" id="char-t-9">
					<rect
						className="char-t-9"
						x="186.29"
						y="150.45"
						width="28.276"
						height="82.65"
						fill={theme.logoPalette.pink}
					/>
					<rect
						className="char-t-9"
						x="171.53"
						y="147.54"
						width="58.117"
						height="16.131"
						fill={theme.logoPalette.blue}
					/>
				</g>
				<g transform="translate(57.452 -39.409)" id="char-s-10">
					<path
						className="char-s-10"
						transform="matrix(-.83636 .54817 -.563 -.82646 0 0)"
						d="m-84.306-306.67a39.053 38.766 0 0 1 -38.92 38.766 39.053 38.766 0 0 1 -39.185 -38.501l39.052-0.2646z"
						fill="#f2b490"
					/>
					<path
						className="char-s-10"
						transform="matrix(.83636 -.54817 .563 .82646 0 0)"
						d="m146.05 307.31a39.053 38.766 0 0 1 -38.92 38.766 39.053 38.766 0 0 1 -39.185 -38.501l39.052-0.26461z"
						fill={theme.logoPalette.blue}
					/>
				</g>
			</g>
		</svg>
	)
})

export default Logo
