const cron = require('cron');
const sendSms = require('./twilio');
const axios = require('axios');

const port = 3000;

let my_job;
const sendMessage = message => {
	// every 10 seconds
	my_job = new cron.CronJob(
		'0/10 * * * * *',
		() => {
			sendSms(process.env.MY_NUMBER, message);
		},
		null,
		true,
		'America/Los_Angeles'
	);
};

// sendWeather();

// cron job that excutes every 24 hours
// cron job that excutes at 12 pm (Covid)
// cron job that excutes at 1 pm (Quote)
// cron job that excutes every 4 hours (Weather)

// function sends the weather as sms
// function sends the covid as sms
// function sends the quote as sms
async function getWeather() {
	const API_KEY = '35efb4128ba9902e1e91a7e3a6b98dbd';
	try {
		const weather = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?q=Egypt&units=imperial&appid=${API_KEY}`
		);
		const temperature = weather.data.main.temp;
		const message = `The weather is ${temperature} right now in Egypt.`;
		sendSms(process.env.MY_NUMBER, message);
		return;
	} catch (e) {
		console.log(e);
	}
}

async function getCovidStats() {
	const stats = await axios.get(
		'https://covid19.mathdro.id/api/countries/egypt'
	);
	const { confirmed, recovered, deaths } = stats.data;
	const confirmedPeople = confirmed.value;
	const recoverdPeople = recovered.value;
	const deathsPeople = deaths.value;
	const message = `Covid-19 stats in Egypt today .. 
	${confirmedPeople} are confirmed
	${recoverdPeople} are recovered
	${deathsPeople} died
	`;

	sendSms(process.env.MY_NUMBER, message);
}

async function getMyTodos() {
	const data = await axios.get(
		'https://api.trello.com/1/lists/601a4dbf619e6c2ba5b205ce/cards?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929'
	);
	// arrray of objects
	const todosToday = data.data;
	let message = '';
	todosToday.forEach((todo, index) => {
		let task = `\n${index + 1}) ${todo.name}`;
		message += task;
		console.log(message);
	});
	sendSms(process.env.MY_NUMBER, message);
}

// getWeather();
// getCovidStats();
getMyTodos();

// trello apiKey a387dd7b861b7f77544a9ed0afbec223
// token 97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
// GET boards https://api.trello.com/1/boards/9mw8XF70/memberships?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
// GET cars https://api.trello.com/1/cards?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
// get all lists https://api.trello.com/1/boards/9mw8XF70/lists?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
// todo today list id 601a4dbf619e6c2ba5b205ce
// todo list id 55799793131a423593ddfdb3
// get todo list by id https://api.trello.com/1/lists/55799793131a423593ddfdb3?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
// get all cards in my todo https://api.trello.com/1/lists/55799793131a423593ddfdb3/cards?key=a387dd7b861b7f77544a9ed0afbec223&token=97bc38d7160c6faf2e076f8b81a6d0e8e30bd3a7129e4fd5035502204bc48929
