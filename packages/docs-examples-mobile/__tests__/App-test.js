/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import 'react-native';
import renderer from 'react-test-renderer';
import App from '../App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
	expect(() => renderer.create(<App />)).not.toThrow();
});
