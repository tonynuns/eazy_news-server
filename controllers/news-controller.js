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

const getArchiveNews = async (req, res) => {
	const { startdate, enddate } = req.headers;
	try {
		// Fetch news articles published between provided date range
		const newsArr = await knex("news")
			.where("published_at", ">=", new Date(startdate))
			.where("published_at", "<=", new Date(enddate));

		res.status(200).json(newsArr);
	} catch (error) {
		res.status(500).json({
			message: `Error retrieving news: ${error}`,
		});
	}
};

const getNewsComments = async (req, res) => {
	const { id } = req.params;

	try {
		// check if a news article with the given id exists
		const news = await knex("news").where("id", id).first();
		if (!news) {
			return res.status(404).json({
				message: `News with ID ${id} not found`,
			});
		}

		// check if comments existi for news article with the given id
		const newsComments = await knex("comments").where("news_id", id).first();
		if (!newsComments) {
			return res.status(404).json({
				message: `Comments for news with ID ${id} not found`,
			});
		}

		// fetch all comments with the given news id and append comment author names from the user table
		const comments = await knex("comments")
			.join("users", "users.id", "comments.user_id")
			.select("comments.*", "users.first_name", "users.last_name")
			.where("news_id", id);
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({
			message: `Error retrieving comments: ${error}`,
		});
	}
};

module.exports = {
	getCurrentNews,
	getArchiveNews,
	getNewsComments,
};
