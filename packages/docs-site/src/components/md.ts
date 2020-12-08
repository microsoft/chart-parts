/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Authorship } from './authorship'
import { ExampleTabs } from './example-tabs'
import markTesters from './mark-testers'

const mdIndex = {
	'view-source': ExampleTabs,
	'author-details': Authorship,
	...markTesters,
}
export default mdIndex
