import React from 'react';
import {
	View, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import Moment from 'moment';

/* components */
import {
	ScreenHeader, OfflineNotice, Text, LoadingSquare, Container, WheelPicker, Alert,
} from '../components/index';

/* helpers */
import {
	DateHelper, ApiHelper, StringHelper,
} from '../helpers/index';

import styles from './styles/MainScreen';

const locations = require('../../assets/json/location.json');
const rightArrow = require('../../assets/images/right_arrow_red.png');
const singaporeWeatherApiLink = 'https://api.darksky.net/forecast/8eea98f4102cee2bb7b4501fc9b8be69/';

console.ignoredYellowBox = ['Setting a timer'];

export default class MainScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state =
		{
			weather: undefined,
			locationMap: new Map(),
			selectedLocation: undefined,
			isLoading: false,
			isFahrenheit: true,
		};
	}

	componentDidMount()
	{
		this.loadWeather();

		/* refresh/recall api hourly */
		this.interval = setInterval(() => {
			this.loadWeather();
		}, 1000 * 60 * 60)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	loadWeather = () =>
	{
		this.setState({ isLoading: true });

		let locationMap = this.loadLocationMap();
		let selectedLocation = this.state.selectedLocation;
		if (!selectedLocation) {
			selectedLocation = [...locationMap.keys()][0];
			this.setState({ selectedLocation });
		}

		let coord = locationMap.get(selectedLocation);

		ApiHelper.getMethod(`${singaporeWeatherApiLink}${coord.lat},${coord.lon}`)
		.then(res =>
		{
			if (res)
			{
				this.setState({
					weather: res,
					isLoading: false,
				});
			}
		})
		.catch(err =>
		{
			this.setState({ isLoading: true });
			
			this.networkAlert.alert();
			console.log(err);
		})
	}

	loadLocationMap = () => {
		locations.forEach((location, index) => {
			this.state.locationMap.set(location.location, location.coord);
		});

		return (this.state.locationMap);
	}

	renderCurrentWeather = () =>
	{
		if (this.state.weather)
		{
			let today = DateHelper.getMomentFromUnix(this.state.weather.currently.time);
			let temperature = this.state.weather.currently.temperature;
			let status = this.state.weather.currently.icon;

			return (
				<View style={styles.currentWeatherContainer}>
					<Text style={styles.currentWeatherDateTxt}>{DateHelper.momentToFormat1(today)}</Text>
					<Text style={styles.currentWeatherTempTxt}>{this.getPreciseTemperature(temperature)}</Text>
					<Text style={styles.currentWeatherStatusTxt}>{StringHelper.capitalizeFirstChar(status)}</Text>
				</View>
			)
		}

		return (null)
	}

	renderWeatherRow = () =>
	{
		if (this.state.weather)
		{
			return (
				this.state.weather.daily.data.map((obj, index) => {
					let date = DateHelper.getMomentFromUnix(obj.time);
					let minTemperature = obj.temperatureMin;
					let maxTemperature = obj.temperatureMax;
					let status = obj.icon;

					return (
						<View key={index} style={styles.weatherRow}>
							<View style={styles.weatherRowDetail}>
								<Text style={styles.weatherRowDetailDateTxt}>{DateHelper.momentToFormat2(date)}</Text>
								<Text style={styles.weatherRowDetailTempTxt}>{`${this.getPreciseTemperature(minTemperature)}-${this.getPreciseTemperature(maxTemperature)}`}</Text>
								<Text style={styles.weatherRowDetailStatusTxt}>{StringHelper.capitalizeFirstChar(status)}</Text>
							</View>

							<TouchableOpacity
								style={styles.rightArrowBtn}
								onPress={() => this.props.navigation.navigate('WeatherDetail', {
									weatherData: obj,
									isFahrenheit: this.state.isFahrenheit,
								})}
							>
								<Image source={rightArrow} style={styles.rightArrow} />
							</TouchableOpacity>
						</View>
					)
				})
			);
		}

		return (null);
	}

	renderTitle = () =>
	(
		<TouchableOpacity
			style={styles.titleBtn}
			onPress={() => this.locationPicker.showPicker()}
		>
			<Text numberOfLines={1} style={styles.screenTitle}>{this.state.selectedLocation}</Text>
			{
				(this.state.locationMap.size > 0)
				? (
						<WheelPicker
							ref={ref => this.locationPicker = ref}
							data={[...this.state.locationMap.keys()]}
							fontSize={18}
							onPickerConfirm={value => this.onLocationPick(value)}
						/>
					)
				: null
			}
		</TouchableOpacity>
	)

	renderScaleSelection = () =>
	(
		<TouchableOpacity
			style={styles.scaleSelectBtn}
			onPress={() => this.setState(prevState => ({ isFahrenheit: !prevState.isFahrenheit }))}
		>
			<Text style={{ color: (this.state.isFahrenheit) ? '#fff' : '#ffffff7f' }}>{`\u2109`}</Text>
			<Text style={styles.scaleTxt}>{` / `}</Text>
			<Text style={{ color: (!this.state.isFahrenheit) ? '#fff' : '#ffffff7f' }}>{`\u2103`}</Text>
		</TouchableOpacity>
	)

	onLocationPick = (value) =>
	{
		this.setState({
			selectedLocation: value,
		}, () => this.loadWeather())
	}

	getPreciseTemperature = (value) =>
	{
		if (this.state.isFahrenheit)
		{
			return (`${Math.round(value)}\u2109`);
		}
		else
		{
			let celsius = (value - 32) * 5 / 9;
			return (`${Math.round(celsius)}\u2103`);
		}
	}

	render()
	{
		return (
			<Container>
				<ScreenHeader
					renderTitle={this.renderTitle()}
					navigation={this.props.navigation}
					renderRight={this.renderScaleSelection()}
				/>

				{
					(this.state.isLoading)
					? <LoadingSquare />
					: null
				}
				<ScrollView showsVerticalScrollIndicator={false}>
					{
						this.renderCurrentWeather()
					}
					{
						this.renderWeatherRow()
					}
				</ScrollView>

				{/* alerts */}
				<Alert
          ref={ref => this.networkAlert = ref}
          message="Network error, please try again later"
          buttons={
            [
              { text: 'OK', onPress: () => {} },
            ]
          }
        />
			</Container>
		);
	}
}


