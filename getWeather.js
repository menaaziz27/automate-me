const axios = require('axios');
module.exports = {
	// GET weather data
	getWeather: async () => {
		try {
			const weather = await axios.get(
				`http://api.openweathermap.org/data/2.5/weather?q=Egypt&units=imperial&appid=${process.env.WEATHER_API_KEY}`
			);
			const temperature = weather.data.main.temp;
			const message = `The weather is ${temperature} right now in Egypt.`;
			// sendSms(process.env.MY_NUMBER, message);
			return message;
		} catch (e) {
			console.log(e);
		}
	},
};
