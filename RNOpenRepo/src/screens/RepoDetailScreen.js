import React from 'react';
import {
	View, Text, ScrollView,
} from 'react-native';

/* components */
import {
	ScreenHeader,
} from '../components/index';

/* styles */
import styles from './styles/RepoDetailScreen';

export default class RepoDetailScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.navigation.getParam('data'),
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScreenHeader
					navigation={this.props.navigation}
					title={this.state.data.name}
					truncateTitle
				/>

				<ScrollView>
					<View style={styles.descriptionView}>
						<Text style={styles.descriptionTxt}>{this.state.data.description}</Text>
					</View>

					<DetailRow title='Language' value={this.state.data.language} />
					<DetailRow title='No. Stars' value={this.state.data.stargazers_count} />
					<DetailRow title='No. Forks' value={this.state.data.forks_count} />
					<DetailRow title='No. Watchers' value={this.state.data.watchers_count} />

				</ScrollView>
			</View>
		)
	}
}

const DetailRow = ({ title, value }) => (
	<View style={styles.detailRow}>
		<Text style={styles.detailTitleTxt}>{title}</Text>
		<Text style={styles.detailValueTxt}>{value}</Text>
	</View>
)