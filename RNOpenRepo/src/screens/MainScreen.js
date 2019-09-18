import React from 'react';
import {
	View, FlatList, Text, ActivityIndicator, RefreshControl, Image, TouchableOpacity,
} from 'react-native';

/* components */
import {
	ScreenHeader, LoadingSquare,
} from '../components/index';
import RepoItemList from './components/RepoItemList';

/* redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions */
import { getRNOpenRepo, pullToRefreshRNOpenRepo, } from '../actions/apiAction';

/* styles */
import styles from './styles/MainScreen';

const searchIcon = require('../../assets/images/search.png');

class MainScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 0,
			dispLimit: 15,
		}
	}

	componentDidMount() {
		this.loadRNOpenRepo();
	}

	loadRNOpenRepo = () => {
		if (!this.props.repository.isLoading) {
			this.setState(prevState => ({ page: prevState.page + 1 }), () => {
				this.props.getRNOpenRepo(this.state.page, this.state.dispLimit);
			});
		}
	}

	renderRepos = () => ({ item, index }) => (
		<RepoItemList data={item} navigation={this.props.navigation} />
	)

	onRefresh = () => {
		if (!this.props.repository.isLoading) {
			this.props.pullToRefreshRNOpenRepo();
			this.setState({ page: 0 }, () => {
					this.setState(prevState => ({ page: prevState.page + 1 }), () => {
					this.props.getRNOpenRepo(this.state.page, this.state.dispLimit);
				});
			});
		}
	}

	renderSearchBtn = () => (
		<TouchableOpacity style={styles.searchBtn} onPress={() => this.props.navigation.navigate('SearchRepoScreen')}>
			<Image source={searchIcon} style={styles.searchIcon} />
		</TouchableOpacity>
	)

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScreenHeader
					navigation={this.props.navigation}
					title='React Native Community'
					renderRight={this.renderSearchBtn()}
				/>

				{
					(this.props.repository.isLoading)
					? <LoadingSquare />
					: null
				}

				<FlatList
					data={this.props.repository.rnOpenRepoData}
					keyExtractor={(item) => item.id.toString()}
					renderItem={this.renderRepos()}
					initialNumToRender={this.state.dispLimit}
					onEndReachedThreshold={0.5}
					onEndReached={this.loadRNOpenRepo}
					removeClippedSubviews={false}
					refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh}
            />
          }
				/>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('State: ', state);
	return {
		repository: state.repository,
	}
}

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		getRNOpenRepo,
		pullToRefreshRNOpenRepo,
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);