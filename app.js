const cron = require('cron');
const sendSms = require('./twilio');
require('dotenv').config();
const app = require('express')();

const { getCovidStats } = require('./getCovid');
const { getQuote } = require('./getQuote');
const { getWeather } = require('./getWeather');
const { getMyTodos } = require('./getTodos');

// at 11 am everyday (weather)
weatherJob = new cron.CronJob(
	'0 1 * * *',
	async () => {
		const weather = await getWeather();
		sendSms(process.env.MY_NUMBER, weather);
	},
	null,
	true,
	'America/Los_Angeles'
);

// every 8 hours (Todos)
todosJob = new cron.CronJob(
	'0 */8 * * *',
	async () => {
		const myTodos = await getMyTodos();
		sendSms(process.env.MY_NUMBER, myTodos);
	},
	null,
	true,
	'America/Los_Angeles'
);

// at 12 pm everyday (covid)
covidJob = new cron.CronJob(
	'0 2 * * *',
	async () => {
		const covidStats = await getCovidStats();
		sendSms(process.env.MY_NUMBER, covidStats);
	},
	null,
	true,
	'America/Los_Angeles'
);

// at 5 pm everyday (Quote)
quoteJob = new cron.CronJob(
	'0 7 * * *',
	async () => {
		const quote = await getQuote();
		sendSms(process.env.MY_NUMBER, quote);
	},
	null,
	true,
	'America/Los_Angeles'
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});
