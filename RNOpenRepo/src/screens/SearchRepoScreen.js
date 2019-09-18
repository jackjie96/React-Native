import React from 'react';
import {
	KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, FlatList,
	Keyboard,
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
import { searchRepo, } from '../actions/apiAction';

/* styles */
import styles from './styles/SearchRepoScreen';

class SearchRepoScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			dispLimit: 15,
			keyword: '',
		}
	}

	renderRepos = () => ({ item, index }) => (
		<RepoItemList data={item} navigation={this.props.navigation} />
	)

	onSearch = () => {
		if (!this.props.repository.isLoading && this.state.keyword.trim().length) {
			Keyboard.dismiss();
			this.setState({ page: 1 }, () => {
				this.props.searchRepo(this.state.keyword, this.state.page, this.state.dispLimit)
			})
		}
	}

	loadMoreData = () => {
		if (!this.props.repository.isLoading) {
			this.setState(prevState => ({ page: prevState.page + 1 }), () => {
				this.props.searchRepo(this.state.keyword, this.state.page, this.state.dispLimit)
			})
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScreenHeader
					navigation={this.props.navigation}
					title="Search"
				/>

				{
					(this.props.repository.isLoading)
					? <LoadingSquare />
					: null
				}

				<KeyboardAvoidingView
					style={{ flex: 1 }}
		      behavior="padding"
		    >
		    	<View style={styles.txtInputView}>
		    		<TextInput
		    			style={styles.txtInput}
		    			placeholder="Search"
		    			onChangeText={value => this.setState({ keyword: value })}
		    			value={this.state.keyword}
		    		/>

		    		<TouchableOpacity style={styles.searchBtn} onPress={() => this.onSearch()}>
		    			<Text>Enter</Text>
		    		</TouchableOpacity>
		    	</View>

		    	<FlatList
						data={this.props.repository.searchRepoData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={this.renderRepos()}
						initialNumToRender={this.state.dispLimit}
						onEndReachedThreshold={0.5}
						onEndReached={this.loadMoreData}
						removeClippedSubviews={false}
					/>
		    </KeyboardAvoidingView>
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
		searchRepo,
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchRepoScreen);