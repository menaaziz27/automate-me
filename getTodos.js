const axios = require('axios');
module.exports = {
	getMyTodos: async () => {
		try {
			const data = await axios.get(
				`https://api.trello.com/1/lists/${process.env.TRELLO_LIST_ID}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
			);
			const todosToday = data.data;
			let message = '';
			todosToday.forEach((todo, index) => {
				let task = `\n${index + 1}) ${todo.name}`;
				message += task;
			});
			return message;
		} catch (e) {
			console.log(e);
		}
	},
};
