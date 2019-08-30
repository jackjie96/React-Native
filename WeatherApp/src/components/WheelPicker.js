import React from 'react';
import {
	SafeAreaView, Modal, StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Picker } from 'react-native-wheel-pick';

export default class WheelPicker extends React.Component
{
	state =
	{
		isVisible: false,
		selected: this.props.selectedValue,
	};

	static propTypes =
	{
		data: PropTypes.array,
		selectedValue: PropTypes.string,
		onPickerConfirm: PropTypes.func,
		fontSize: PropTypes.number,
	};

	static defaultProps =
	{
		data: [],
		selectedValue: '',
		onPickerConfirm: () => {},
		fontSize: 26,
	};

	showPicker = () =>
	{
		this.setState({
			isVisible: true,
		});
	}

	closePicker = () =>
	{
		this.setState({
			isVisible: false,
		});
	}

	onPickerClose = () =>
	{
		this.closePicker();
	}

	onPickerConfirm = () =>
	{
		this.props.onPickerConfirm(this.state.selected);
		this.closePicker();
	}

	render() {
		return (
			<Modal
				animationType="slide"
        transparent={true}
        visible={this.state.isVisible}
        onRequestClose={() => this.closePicker()}
      >
      	<SafeAreaView style={styles.container}>
      		<View style={styles.btnContainer}>
      			<TouchableOpacity style={styles.closeBtn} onPress={() => this.onPickerClose()}>
      				<Text>Close</Text>
      			</TouchableOpacity>

      			<TouchableOpacity style={styles.confirmBtn} onPress={() => this.onPickerConfirm()}>
      				<Text>Confirm</Text>
      			</TouchableOpacity>
      		</View>

      		<Picker
      			style={styles.picker}
      			textSize={this.props.fontSize}
					  selectedValue={this.state.selected}
					  pickerData={this.props.data}
					  onValueChange={value => this.setState({ selected: value })}
					/>
      	</SafeAreaView>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 'auto',
	},
	btnContainer: {
		backgroundColor: '#dfdfdf',
		flexDirection: 'row',
		padding: 15,
	},
	picker: {
		backgroundColor: '#dfdfdf',
	},
	confirmBtn: {
		marginLeft: 'auto',
	},
});