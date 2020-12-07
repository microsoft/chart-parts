/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react';
// import Chart from './BarChart';
// import Charts from './Chart';
import PopulationPyramid from './PopulationPyramid';
import {StyleSheet, View} from 'react-native';

const App = () => (
	<View style={styles.container}>
		<PopulationPyramid />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

export default App;
