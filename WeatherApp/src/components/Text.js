import React from 'react';
import {
	Text, StyleSheet,
} from 'react-native';

export default class TextComponent extends React.Component {
	render() {
		return (
			<Text {...this.props} style={[styles.txt, this.props.style]}>
			{
				this.props.children
			}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
	txt: {
		color: '#000',
		fontSize: 13,
	},
});
