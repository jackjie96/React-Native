import React from 'react';
import {
	createAppContainer,
} from 'react-navigation';
import {
	createStackNavigator,
} from 'react-navigation-stack';

/* screens */
import MainScreen from './screens/MainScreen';
import RepoDetailScreen from './screens/RepoDetailScreen';
import SearchRepoScreen from './screens/SearchRepoScreen';

const Navigator = createAppContainer(
	createStackNavigator({
		MainScreen: {
			screen: MainScreen,
		},
		RepoDetailScreen: {
			screen: RepoDetailScreen,
		},
		SearchRepoScreen: {
			screen: SearchRepoScreen,
		},
	},
	{
		initialRouteName: 'MainScreen',
		defaultNavigationOptions: {
			header: null,
		},
	})
);

export {
	Navigator,
};