import React from 'react';
import {
	SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './stores/store';

/* navigation */
import { Navigator } from './Navigator';

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					<Navigator />
				</Provider>
			</SafeAreaView>
		);
	}
}