const cron = require('cron');
const sendSms = require('./twilio');
const axios = require('axios');
require('dotenv').config();

const { getCovidStats } = require('./getCovid');
const { getQuote } = require('./getQuote');
const { getWeather } = require('./getWeather');
const { getMyTodos } = require('./getTodos');

// at 11 am everyday (weather)
weatherJob = new cron.CronJob(
	'0 0 1 * * *',
	() => {
		const weather = getWeather();
		sendSms(process.env.MY_NUMBER, weather);
	},
	null,
	true,
	'America/Los_Angeles'
);

// every 8 hours (Todos)
todosJob = new cron.CronJob(
	'0 */8 * * *',
	() => {
		const myTodos = getMyTodos();
		sendSms(process.env.MY_NUMBER, myTodos);
	},
	null,
	true,
	'America/Los_Angeles'
);

// at 12 pm everyday (covid)
covidJob = new cron.CronJob(
	'0 0 2 * * *',
	() => {
		const covidStats = getCovidStats();
		sendSms(process.env.MY_NUMBER, covidStats);
	},
	null,
	true,
	'America/Los_Angeles'
);

// at 5 pm everyday (Quote)
quoteJob = new cron.CronJob(
	'0 0 7 * * *',
	() => {
		const quote = getQuote();
		sendSms(process.env.MY_NUMBER, quote);
	},
	null,
	true,
	'America/Los_Angeles'
);
