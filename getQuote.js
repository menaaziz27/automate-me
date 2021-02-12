const axios = require('axios');
module.exports = {
	getQuote: async () => {
		try {
			const quote = await axios.get(
				'https://apiforquotes.herokuapp.com/api/quotes/random'
			);
			const message = quote.data.randomQuote[0].content;
			return message;
		} catch (e) {
			console.log(e);
		}
	},
};
