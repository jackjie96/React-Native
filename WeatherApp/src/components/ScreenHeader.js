import React from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

/* local files */
const leftArrow = require('../../assets/images/left_arrow_white.png');

export default class ScreenHeader extends React.Component {
	static propTypes =
	{
		title: PropTypes.string,
		truncateTitle: PropTypes.bool,
		transparent: PropTypes.bool,
		navigation: PropTypes.object,
		renderTitle: PropTypes.element,
		renderLeft: PropTypes.element,
		renderRight: PropTypes.element,
	};

	static defaultProps =
	{
		title: '',
		truncateTitle: false,
		transparent: false,
		renderTitle: <View />,
		renderLeft: <View />,
		renderRight: <View />,
	};

	renderLeftContainer = () =>
	{
		let enableBack = false;
		if (this.props.navigation) {
			let parentNode = this.props.navigation.dangerouslyGetParent();
			enableBack = (parentNode && parentNode.state && parentNode.state.index > 0);
		}

		return (
			<View style={styles.leftContainer}>
				{
					(enableBack)
					? (
							<TouchableOpacity
								style={styles.leftArrowBtn}
								onPress={() => this.props.navigation.goBack()}
							>
								<Image source={leftArrow} style={styles.leftArrow} />
								<Text style={styles.backTxt}>Back</Text>
							</TouchableOpacity>
						)
					: null
				}
			</View>
		)
	}

	renderRightContainer = () =>
	(
		<View style={styles.rightContainer}>
		{
			this.props.renderRight
		}
		</View>
	)

	renderTitleContainer = () =>
	(
		<View style={styles.titleContainer}>
			{
				(this.props.title)
					? <Text style={[styles.title]} numberOfLines={(this.props.truncateTitle) ? 1 : null}>{this.props.title}</Text>
					: this.props.renderTitle
			}
		</View>
	)

	render() {
		return (
			<View style={[styles.container, (this.props.transparent) ? { backgroundColor: 'transparent'} : null]}>
				{
					(this.props.transparent)
					? null
					: <StatusBar backgroundColor={styles.container.backgroundColor} />
				}
				{
					this.renderLeftContainer()
				}
				{
					this.renderTitleContainer()
				}
				{
					this.renderRightContainer()
				}
			</View>
		);
	}
}

/* styling */
const whiteColor = '#fff';

const styles = StyleSheet.create({
	container: {
		height: 40,
		flexDirection: 'row',
		elevation: 2,
		backgroundColor: '#ec4334',
	},
	leftContainer: {
		width: '20%',
		height: '100%',
		borderColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		width: '20%',
		height: '100%',
	},
	titleContainer: {
		width: '60%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: whiteColor,
		fontSize: 15,
	},
	leftArrowBtn: {
		marginHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftArrow: {
		width: 10,
		height: 10,
		resizeMode: 'contain',
	},
	backTxt: {
		color: 'transparent',
	},
});
