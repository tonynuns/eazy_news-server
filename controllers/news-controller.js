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

const getNewsDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const foundNews = await knex("news").where("id", id);
		if (foundNews.length === 0) {
			return res.status(404).json({
				message: `News with ID ${id} not found.`,
				length: 0,
			});
		}
		const currentNews = foundNews[0];
		res.status(200).json(currentNews);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve news with ID ${id}.`,
		});
	}
};

const updateViews = async (req, res) => {
	const { id } = req.params;
	try {
		const rowsUpdated = await knex("news").where("id", id).update(req.body);
		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `news with ID ${id} not found`,
			});
		}
		const updatedNews = await knex("news").where("id", id);
		res.status(200).json(updatedNews[0].views);
	} catch (error) {
		res.status(500).json({
			message: `Unable to update views for news with ID ${id}: ${error}`,
		});
	}
};

const updateLikes = async (req, res) => {
	const { id } = req.params;
	try {
		const rowsUpdated = await knex("news").where("id", id).update(req.body);
		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `news with ID ${id} not found`,
			});
		}
		const updatedNews = await knex("news").where("id", id);
		res.status(200).json(updatedNews[0].likes);
	} catch (error) {
		res.status(500).json({
			message: `Unable to update views for news with ID ${id}: ${error}`,
		});
	}
};

module.exports = {
	getCurrentNews,
	getArchiveNews,
	getNewsDetail,
	updateViews,
	updateLikes,
};
