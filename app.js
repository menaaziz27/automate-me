const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const sendSms = require('./twilio');
const cron = require('cron');
const Fetch = require('./fetch');

const ft = new Fetch();

// Global var
const port = 3000;

let quote_job;
const sendWeather = async () => {
	const data = await ft.getEgyptWeather();
	quote_job = new cron.CronJob(
		'0/10 * * * * *',
		() => {
			let temp_text;
			temp_c = data.data.current.temp_c;
			condition = data.data.current.condition.text;
			if (temp_c > 20) {
				temp_text = 'ya3ni 7arr ya zmele';
			} else if (temp_c < 14) {
				temp_text = 'brrrd ya zmeelee brdddd';
			} else if (temp_c < 20 && temp_c > 14) {
				temp_text = 'w kollo f el lolo';
			} else {
				temp_text = 'eshkorny yasta 3l m3lomat el gamda de';
			}
			let temp = `daraget el 7rara dlw2ty ${temp_c}C ${temp_text} w ${condition}`;
			sendSms(process.env.MY_NUMBER, temp);
			console.log(temp);
		},
		null,
		true,
		'America/Los_Angeles'
	);
};

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

// app.post('/', (req, res) => {
// 	const message = req.body.message;

// 	if (my_job) {
// 		my_job.stop();
// 	}
// 	sendMessage(message);

// 	res.send('successfuly sent');
// });

// app.listen(3000, () => {
// 	console.log(`Server running on port ${port}`);
// });

// calling my automated jobs
sendWeather();
