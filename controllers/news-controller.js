const knex = require("knex")(require("../knexfile"));

const getCurrentNews = async (req, res) => {
	const currentDateObj = new Date();
	const twoDaysMlSec = 48 * 60 * 60 * 1000;
	const newsStartDate = currentDateObj.getTime() - twoDaysMlSec;

	try {
		// Fetch news articles published 48 hours ago from current time
		const newsArr = await knex("news").where("published_at", ">", new Date(newsStartDate));
		res.status(200).json(newsArr);
	} catch (error) {
		res.status(500).json({
			message: `Error retrieving news: ${error}`,
		});
	}
};

module.exports = {
	getCurrentNews,
};