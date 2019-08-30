import React from 'react';
import {
	SafeAreaView,
} from 'react-native';

/* components */
import {
	OfflineNotice,
} from './components/index';

/* navigation */
import { Navigator } from './Navigator';

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<OfflineNotice />
				<Navigator />
			</SafeAreaView>
		);
	}
}

