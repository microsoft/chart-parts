import * as React from 'react'
import Chart from './BarChart'
import Charts from './Chart'
import { StyleSheet, View } from 'react-native'

console.log('Render App', Chart, Charts)

const App = () => (
	<View style={styles.container}>
		<Chart />
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
})

export default App
