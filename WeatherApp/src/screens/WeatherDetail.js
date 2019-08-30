import React from 'react';
import {
	ScrollView, View,
} from 'react-native';

/* components */
import {
	Container, ScreenHeader, Text,
} from '../components/index';

/* helpers */
import {
	DateHelper, StringHelper,
} from '../helpers/index';

import styles from './styles/WeatherDetail';

export default class WeatherDetail extends React.Component {
	constructor(props) {
		super(props);

		this.state =
		{
			weatherData: this.props.navigation.getParam('weatherData'),
			isFahrenheit: this.props.navigation.getParam('isFahrenheit'),
		};
	}

	renderHeadline = () =>
	{
		let date = DateHelper.getMomentFromUnix(this.state.weatherData.time);
		let minTemperature = this.state.weatherData.temperatureMin;
		let maxTemperature = this.state.weatherData.temperatureMax;
		let status = this.state.weatherData.icon;

		return (
			<View style={styles.headlineContainer}>
				<Text style={styles.headlineDateTxt}>
					{DateHelper.momentToFormat2(date)}
				</Text>

				<Text style={styles.headlineTempTxt}>
					{`${this.getPreciseTemperature(minTemperature)}-${this.getPreciseTemperature(maxTemperature)}`}
				</Text>

				<Text style={styles.headlineStatusTxt}>
					{StringHelper.capitalizeFirstChar(status)}
				</Text>
			</View>
		)
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

	getWindDirection = (value) =>
	{
		if (value === 0)
		{
			return ('N');
		}

		if (value < 90)
		{
			return ('NE');
		}

		if (value === 90)
		{
			return ('E');
		}

		if (value < 180)
		{
			return ('SE');
		}

		if (value === 180)
		{
			return ('S');
		}

		if (value < 270)
		{
			return ('SW');
		}

		if (value === 270)
		{
			return ('W');
		}

		return ('NW');
	}

	milesToKm = (value) =>
	{
		let km = value * 1.609;

		return (`${Math.round(km)} KM`);
	}

	render() {
		return (
			<Container>
				<ScreenHeader
					navigation={this.props.navigation}
					title={DateHelper.momentToFormat2(DateHelper.getMomentFromUnix(this.state.weatherData.time))}
				/>

				<ScrollView showsVerticalScrollIndicator={false}>
					{
						this.renderHeadline()
					}

					<View style={styles.summaryContainer}>
						<Text>{this.state.weatherData.summary}</Text>
					</View>

					<DetailRow
						titleLeft="SUNRISE"
						valueLeft={DateHelper.momentToFormat3(DateHelper.getMomentFromUnix(this.state.weatherData.sunriseTime))}
						titleRight="SUNSET"
						valueRight={DateHelper.momentToFormat3(DateHelper.getMomentFromUnix(this.state.weatherData.sunsetTime))}
					/>

					<DetailRow
						titleLeft="WIND"
						valueLeft={
							`${this.getWindDirection(this.state.weatherData.windBearing)} ${this.milesToKm(this.state.weatherData.windSpeed)}/HR`
						}
						titleRight="FEELS LIKE"
						valueRight={
							`${this.getPreciseTemperature(this.state.weatherData.apparentTemperatureMin)}-${this.getPreciseTemperature(this.state.weatherData.apparentTemperatureMax)}`
						}
					/>

					<DetailRow
						titleLeft="PRECIPITATION"
						valueLeft={
							`${Math.round(this.state.weatherData.precipProbability)} CM`
						}
						titleRight="PRESSURE"
						valueRight={
							`${Math.round(this.state.weatherData.pressure)} hPa`
						}
					/>

					<DetailRow
						titleLeft="VISIBILITY"
						valueLeft={
							`${this.milesToKm(this.state.weatherData.visibility)}`
						}
						titleRight="UV INDEX"
						valueRight={
							`${this.state.weatherData.uvIndex}`
						}
					/>

					<DetailRow
						titleLeft="HUMIDITY"
						valueLeft={
							`${this.state.weatherData.humidity * 100}%`
						}
					/>
					
				</ScrollView>
			</Container>
		);
	}
}

const DetailRow = ({ titleLeft, valueLeft, titleRight, valueRight }) =>
(
	<View style={styles.detailRow}>
		<View style={styles.detailLeft}>
			<Text style={styles.detailTitle}>{titleLeft}</Text>
			<Text style={styles.detailValue}>{valueLeft}</Text>
		</View>

		<View style={styles.detailRight}>
			<Text style={styles.detailTitle}>{titleRight}</Text>
			<Text style={styles.detailValue}>{valueRight}</Text>
		</View>
	</View>
)
