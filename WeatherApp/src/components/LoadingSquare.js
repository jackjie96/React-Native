import React from 'react';
import {
	StyleSheet, ActivityIndicator, View,
} from 'react-native';

export default class LoadingSquare extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.square}>
				 <ActivityIndicator color="#fff" size="large" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 999,
		elevation: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	square: {
		width: 80,
		height: 80,
		backgroundColor: '#0000007F',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});