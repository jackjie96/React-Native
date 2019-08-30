import React from 'react';
import {
	StyleSheet, View, Text,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class OfflineNotice extends React.Component {
	state =
	{
		isConnected: true,
	};

	componentDidMount()
	{
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
	}

	componentWillUnmount()
	{
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) =>
  {
	  this.setState({ isConnected });
	}

	render() {
		return (
			(!this.state.isConnected)
			? (
					<View style={styles.container}>
						<Text style={styles.txt}>No Internet Connection</Text>
					</View>
				)
			: null
		);
	}
}

/* styling */
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#a4121c',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		elevation: 3,
		width: '100%',
		height: 30,
	},
	txt: {
		fontSize: 13,
		color: '#fff',
	},
});
