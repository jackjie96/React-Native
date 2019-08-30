import React from 'react';
import {

} from 'react-native';
import {
	createStackNavigator, createAppContainer
} from 'react-navigation';

/* screens */
import MainScreen from './screens/MainScreen';
import WeatherDetail from './screens/WeatherDetail';

const _navigationOptions =
{
  header: null,
};

const Navigator = createAppContainer(
	createStackNavigator({
		MainScreen: {
			screen: MainScreen,
		},
		WeatherDetail: {
			screen: WeatherDetail,
		},
	},
	{
		initialRouteName: 'MainScreen',
	  defaultNavigationOptions: _navigationOptions,
	})
);

export {
	Navigator,
};
