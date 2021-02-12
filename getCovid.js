const axios = require('axios');
module.exports = {
	// GET covid stats
	getCovidStats: async () => {
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

		return message;
	},
};
