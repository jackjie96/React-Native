import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const btnImg = require('../../../assets/images/right_arrow_red.png');

const RepoItemList = ({ data, navigation }) => (
	<View style={styles.container}>
		<View style={styles.leftSide}>
			<Text style={styles.dataName}>{data.name}</Text>
			<Text style={styles.dataDescription}>{data.description}</Text>
		</View>

		<View style={styles.rightSide}>
			<TouchableOpacity style={styles.btn}
				onPress={() => navigation.navigate('RepoDetailScreen', { data })}>
				<Image style={styles.btnImg} source={btnImg} />
			</TouchableOpacity>
		</View>
	</View>
)

export default RepoItemList

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		height: 50,
		alignItems: 'center',
		marginBottom: 10,
	},
	leftSide: {
		width: '85%',
	},
	rightSide: {
		width: '15%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dataName: {
		fontSize: 15,
		color: '#0366d6',
		fontWeight: 'bold',
	},
	dataDescription: {
		fontSize: 12,
		color: '#586069',
	},
	btn: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnImg: {
		width: '60%',
		height: '60%',
		resizeMode: 'contain',
	},
});