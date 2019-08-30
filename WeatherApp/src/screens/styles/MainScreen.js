import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const blackColor = '#000';
const whiteColor = '#fff';
const statusColor = '#989898';
const borderBtmColor = '#dfdfdf';

export default StyleSheet.create({
	currentWeatherContainer: {
		width,
		height: height * 0.35 - 40,
		padding: 15,
		alignItems: 'center',
	},
	currentWeatherDateTxt: {
		color: blackColor,
		fontSize: 16,
		fontWeight: '700',
	},
	currentWeatherTempTxt: {
		color: blackColor,
		fontSize: 45,
		fontWeight: '500',
	},
	currentWeatherStatusTxt: {
		color: statusColor,
		fontSize: 20,
		textAlign: 'center',
	},
	weatherRow: {
		flexDirection: 'row',
		borderBottomWidth: 0.98,
		borderBottomColor: borderBtmColor,
	},
	weatherRowDetail: {
		width: width * 0.9,
		paddingHorizontal: 15,
		paddingVertical: 15,
		justifyContent: 'center',
	},
	weatherRowDetailDateTxt: {
		fontWeight: '700',
	},
	weatherRowDetailTempTxt: {
		fontSize: 12,
	},
	weatherRowDetailStatusTxt: {
		fontSize: 12,
		color: statusColor,
	},
	rightArrowBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.1,
	},
	rightArrow: {
		width: 15,
		height: 15,
		resizeMode: 'contain',
	},
	scaleSelectBtn: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	scaleTxt: {
		color: whiteColor,
	},
	screenTitle: {
		color: whiteColor,
		fontSize: 15,
	},
	titleBtn: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
