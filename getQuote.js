const axios = require('axios');
module.exports = {
	getQuote: async () => {
		const quote = await axios.get(
			'https://apiforquotes.herokuapp.com/api/quotes/random'
		);
		const message = quote.data.randomQuote[0].content;
		return message;
	},
};
