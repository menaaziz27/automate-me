const cron = require('cron');
const sendSms = require('./twilio');
const axios = require('axios');
// const express = require('express');
// const path = require('path');
// const Fetch = require('./fetch');
// const ft = new Fetch();
// Global var

const port = 3000;

// let quote_job;
// const seweather = await ft.getEgyptWeather(;
// 	const message = `The weather is ${temperature} right now in Egypt.`ndWeather = async () => {
// 	const messagen;
// 	const = `The weather is ${temperature} right now in Egypt.`r = await ft.getEgyptWeather();
// 	consolemessage);
// 	quote_job = cron.CronJob(
// 		'0/10 * * * * *',
// 		() => {
// 			sendSms(process.env.MY_NUMBER, weather.data.main.temp);
// 		},
// 		null,
// 		true,
// 		'America/Los_Angeles'
// 	);
// };

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

getWeather();
getCovidStats();
