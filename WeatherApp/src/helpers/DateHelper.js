import Moment from 'moment';

export default class DateHelper
{
	static getMomentFromUnix(epoch) 
	{
		return (Moment.unix(epoch));
	}

	/*
	eg: Fri, 16 Aug 2019 10.31 AM
	*/
	static momentToFormat1(momentObj)
	{
		let datetime = Moment(momentObj);

		return (datetime.format('ddd, DD MMM YYYY h:mm A'));
	}

	/*
	eg: 16 Aug 2019, Fri
	*/
	static momentToFormat2(momentObj) 
	{
		let datetime = Moment(momentObj);

		return (datetime.format('DD MMM YYYY, ddd'));
	}

	/*
	eg: 7:40AM
	*/
	static momentToFormat3(momentObj)
	{
		let datetime = Moment(momentObj);

		return (datetime.format('h:mm A'));
	}
}