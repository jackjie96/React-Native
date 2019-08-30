import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const blackColor = '#000';
const whiteColor = '#fff';
const statusColor = '#989898';
const borderBtmColor = '#dfdfdf';

export default StyleSheet.create({
	headlineContainer: {
		width,
		height: height * 0.35 - 40,
		padding: 15,
		alignItems: 'center',
	},
	headlineDateTxt: {
		color: blackColor,
		fontSize: 16,
		fontWeight: '700',
	},
	headlineTempTxt: {
		color: blackColor,
		fontSize: 45,
		fontWeight: '500',
	},
	headlineStatusTxt: {
		color: statusColor,
		fontSize: 20,
		textAlign: 'center',
	},
	summaryContainer: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderTopWidth: 0.98,
		borderBottomWidth: 0.98,
		borderTopColor: borderBtmColor,
		borderBottomColor: borderBtmColor,
	},
	detailRow: {
		flexDirection: 'row',
		borderBottomWidth: 0.98,
		borderBottomColor: borderBtmColor,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	detailLeft: {
		width: '50%',
	},
	detailRight: {
		width: '50%',
	},
	detailTitle: {
		fontSize: 11,
		color: '#0000007f',
	},
	detailValue: {
		fontSize: 15,
	},
});