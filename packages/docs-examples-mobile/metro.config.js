/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: false,
			},
		}),
	},
};
