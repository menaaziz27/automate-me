const axios = require('axios');
module.exports = class Fetch {
	async getEgyptWeather() {
		const API_KEY = '64cb0ee47a3945eda1d65920cb2325fc';
		// const API_KEY = '64cb0ee47a3945eda1d65920cb2325fc'

		try {
			const response = await axios.get(
				// `http://api.weatherbit.io/v2.0/current?city=egypt&key=${API_KEY}`
				'http://api.weatherapi.com/v1/current.json?key=d3e869ff451e4ad897d150733200311&q=el minya'
			);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
};
