import React from 'react';
import {
	StyleSheet, View,
} from 'react-native';

export default class Container extends React.Component {
	render() {
		return (
			<View {...this.props} style={[styles.container, this.props.style]}>
			{
				this.props.children
			}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
