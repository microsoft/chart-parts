import * as React from 'react'
import Chart from './Chart'
import { Platform, StyleSheet, Text, View } from 'react-native'

const App: React.SFC<{}> = () => (
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
