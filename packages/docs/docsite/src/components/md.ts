/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import markTesters from './mark-testers'
import { ExampleTabs } from './example-tabs'

export default {
	'view-source': ExampleTabs,
	...markTesters,
}
